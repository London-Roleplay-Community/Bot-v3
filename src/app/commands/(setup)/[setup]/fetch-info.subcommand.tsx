import { ChatInputCommand, CommandData, Container, Separator, TextDisplay } from "commandkit";
import { load } from "../../../../../utils/jsonUtil.ts";
import hexadecimalToDecimal from "../../../../../utils/hexadecimalToDecimal.ts";
import { CFlags } from "../../../../../utils/types/CFlags.ts";
import { SeparatorSpacingSize } from "discord.js";

export const command: CommandData = {
  name: 'fetch-info',
  description: "Sets up the bot",
};

export const chatInput: ChatInputCommand = async ({ interaction }) => {
  if (!interaction.guild) return interaction.reply({ content: "Not a guild" })
  const serverInfo = await load(interaction.guild.id)
  if (!serverInfo) return interaction.reply({ content: "Failed to fetch" })

  const _channels = Object.entries(serverInfo.channels).map(([k,v]) => `**${k}**: ${v || "not set"}`).join("\n")
  const _categories = Object.entries(serverInfo.categories).map(([k,v]) => `**${k}** : ${v || "not set"}`).join("\n")
  const name = serverInfo.name; const id = serverInfo.id; const channels = _channels || "**None**"; const categories = _categories || "**None**";
  const response = (
    <Container accentColor={hexadecimalToDecimal("#eb6200")}>
      <TextDisplay>## Local server information</TextDisplay>
      <Separator spacing={SeparatorSpacingSize.Large}/>
      <TextDisplay>### Server information:</TextDisplay>
      <TextDisplay>**Id:** {id}</TextDisplay>
      <TextDisplay>**Name:** {name}</TextDisplay>
      <Separator spacing={SeparatorSpacingSize.Small}/>
      <TextDisplay>### Channels and categories</TextDisplay>
      <TextDisplay>{channels}</TextDisplay>
      <TextDisplay>{categories}</TextDisplay>
    </Container>
  )
  return interaction.reply({ components: [response], flags: CFlags.CV2 })
}

/*
 * Commandkit jsx parsing doesn't seem to like having an empty object for some reason.
 * If it's null, make sure to double check it by setting it to a new constant and checking with ||
 * It will throw a "Expected a string primitive" error; we're trying to send a null value instead of a string, so it goes crazy
 * If this happens, it's probably an issue where the value is null
 */