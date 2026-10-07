import { AutocompleteCommand, ChatInputCommandContext, Logger } from "commandkit";
import { ApplicationCommandOptionType } from "discord.js";
import { getGroups } from "../../../../../../../utils/constants/get/groups.ts";

$: SlashCommand("Say something");
export default function exile({ interaction }: ChatInputCommandContext) {
  const roblox_user = $param(ApplicationCommandOptionType.String, {
    description: "The roblox user to exile",
    required: true,
  });
  const group = $param(ApplicationCommandOptionType.String, {
    description: "The group to exile the user from",
    required: true,
  });

  return interaction.reply({ content: "In dev" });
}

export const autocomplete: AutocompleteCommand = async ({ interaction }) => {
  const focused = interaction.options.getFocused(true);
  if (focused.name !== "group") return interaction.respond([]);

  const input = focused.value.toLowerCase();
  if (input.length <= 2) return interaction.respond([]);

  try {
    const groups = await getGroups();
    return interaction.respond(
      Object.entries(groups)
        .filter(([, name]) => name.toLowerCase().includes(input))
        .slice(0, 25)
        .map(([id, name]) => ({ name, value: id })));
  } catch (err) {
    console.error("autocomplete fail", err);
    return interaction.respond([]);
  }
};