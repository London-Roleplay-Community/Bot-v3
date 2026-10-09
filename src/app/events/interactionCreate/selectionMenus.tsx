import { Logger, type EventHandler } from 'commandkit';
import validateInteraction from '../../../../utils/code/validateInteraction.ts';
import errorContainer from '../../components/errorContainer.tsx';
import { MessageFlags } from 'discord.js';
import successContainer from '../../components/successContainer.tsx';
import { CFlags, CV2_EPH } from '../../../../utils/types/misc/CFlags.ts';
import { guildsCollection } from '../../../../utils/configuration/database.ts';
import { ServerData } from '../../../../utils/types/db/dbDecs.ts';
import { IsViableRole, ViableRoles } from '../../../../utils/types/discord/ViableRoles.ts';



const handler: EventHandler<'interactionCreate'> = async (interaction) => {
  if (!interaction.guildId || !interaction.guild) return;
  const server = guildsCollection
  if (!server) {
    Logger.error(`No server!!! Guildid ${interaction.guildId}`)
    return
  }
  if (interaction.isAnySelectMenu()) {
    const [command, topic, userId] = interaction.customId.split("_");
    const interactionInfo = { command, topic, userId }
    if (!validateInteraction(interaction)) { interaction.reply({ components: [errorContainer("This is not your menu!")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }); return; }
    if (interactionInfo.command === "setup") { //* Setup
      const viableChannelOrCategory = topic as keyof ServerData["channels"]
      const input = interaction.values[0]
      Logger.info(input);
      server.findOneAndUpdate({ [`servers.${interaction.guildId}`]: { id: interaction.guildId } }, { $set: { channels: { [viableChannelOrCategory]: input } } }, { returnDocument: "after" })

      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    } else if (interactionInfo.command === "catsetup") { //* Category setup
      const viableChannelOrCategory = topic as keyof ServerData["categories"]
      const input = interaction.values[0]
      Logger.info(input);
      server.findOneAndUpdate({ [`servers.${interaction.guildId}`]: { id: interaction.guildId } }, { $set: { categories: { [viableChannelOrCategory]: input } } }, { returnDocument: "after" })
      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    } else if (interactionInfo.command === "rsetup") {
      const viableRole = topic as IsViableRole<ViableRoles>
      const input = interaction.values[0]
      Logger.info(input)
      server.findOneAndUpdate({ [`servers.${interaction.guildId}`]: { id: interaction.guildId } }, { $set: { roles: { [viableRole]: input } } }, { returnDocument: "after" })
      $: reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: CV2_EPH })
    }
  }
};  

export default handler;
