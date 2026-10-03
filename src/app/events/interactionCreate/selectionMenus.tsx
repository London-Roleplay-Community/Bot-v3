import { Logger, type EventHandler } from 'commandkit';
import validateInteraction from '../../../../utils/validateInteraction.ts';
import errorContainer from '../../components/errorContainer.tsx';
import { MessageFlags } from 'discord.js';
import successContainer from '../../components/successContainer.tsx';
import { CFlags } from '../../../../utils/types/CFlags.ts';
import { load } from '../../../../utils/jsonUtil.ts';
import { ServerInfoData } from '../../../../utils/types/jsonData.ts';
import { guildsCollection } from '../../../../utils/configuration/database.ts';



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
    const viableChannelOrCategory = topic as keyof ServerInfoData["channels"]
    if (!validateInteraction(interaction)) { interaction.reply({ components: [errorContainer("This is not your menu!")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }); return; }
    if (interactionInfo.command === "setup") { //* Setup
      const input = interaction.values[0]
      Logger.info(input);
      server.updateOne({ id: interaction.guildId }, { $set: { channels: { [viableChannelOrCategory]: input } } })

      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    } else if (interactionInfo.command === "catsetup") { //* Category setup
      const input = interaction.values[0]
      Logger.info(input);
      server.updateOne({ id: interaction.guildId }, { $set: { categories: { [viableChannelOrCategory]: input } } })
      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    }
  }
};  

export default handler;
