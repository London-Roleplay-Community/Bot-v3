import { Logger, type EventHandler } from 'commandkit';
import validateInteraction from '../../../../utils/validateInteraction.ts';
import errorContainer from '../../components/errorContainer.tsx';
import { MessageFlags } from 'discord.js';
import { mClient } from '../../../app.ts';
import ServerCollection from '../../../../utils/types/ServerCollection.ts';
import { Collection } from 'mongodb';
import successContainer from '../../components/successContainer.tsx';
import { CFlags } from '../../../../utils/types/CFlags.ts';



const handler: EventHandler<'interactionCreate'> = async (interaction) => {
  if (!interaction.guildId || !interaction.guild) return;
  const collection: Collection<ServerCollection> = mClient.db("servers").collection(interaction.guildId)
  if (interaction.isAnySelectMenu()) {
    const [command, topic, userId] = interaction.customId.split("_");
    const interactionInfo = { command, topic, userId }
    if (!validateInteraction(interaction)) { interaction.reply({ components: [errorContainer("This is not your menu!")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] }); return; }
    if (interactionInfo.command === "setup") { //* Setup
      const input = interaction.values[0]
      Logger.info(input);
      await collection.updateOne({id: interaction.guild.id}, {$set: { [`channels.${interactionInfo.topic}`]: input }}, { upsert: true })

      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    } else if (interactionInfo.command === "catsetup") { //* Category setup
      const input = interaction.values[0]
      Logger.info(input);
      await collection.updateOne({id: interaction.guild.id}, {$set: { [`categories.${interactionInfo.topic}`]: input }}, { upsert: true })

      interaction.reply({ components: [successContainer(`Successfully added \`${interactionInfo.topic}\` value: ${input}`)], flags: [CFlags.EPH, CFlags.CV2] })
    }
  }
};  

export default handler;
