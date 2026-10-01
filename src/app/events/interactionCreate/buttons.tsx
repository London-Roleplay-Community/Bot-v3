import type { EventHandler } from 'commandkit';
import ServerCollection from '../../../../utils/types/ServerCollection.ts';
import { Collection } from 'mongodb';
import { mClient } from '../../../app.ts';
import errorContainer from '../../components/errorContainer.tsx';
import { CFlags } from '../../../../utils/types/CFlags.ts';
import successContainer from '../../components/successContainer.tsx';

const handler: EventHandler<'interactionCreate'> = async (interaction) => {
  if (!interaction.guildId || !interaction.guild) return;
  if (interaction.isButton()) {
    const [command, topic, userId] = interaction.customId.split("_");
    const interactionInfo = { command, topic, userId }
    if (interactionInfo.command === "setup") {
      if (interactionInfo.topic === "done") {
        const collection: Collection<ServerCollection> = mClient.db("servers").collection(interaction.guildId)
        const doc = await collection.findOne({ id: interaction.guild.id });
        if (!doc) {
          interaction.reply({ components: [errorContainer("No database exists! Kick the bot out and re-invite it.")], flags: CFlags.CV2_EPH });
          return;
        }
        const channelLength = Object.keys(doc.channels).length;
        const categoryLength = Object.keys(doc.categories).length;
        if (channelLength === 7 && categoryLength === 2) {
          await collection.updateOne({ id: interaction.guild.id }, { $set: { "completedSetup": true } })
          interaction.reply({ components: [successContainer("You're all good! Your server has been marked as setup.")], flags: CFlags.CV2_EPH })
          return;
        } else {
          interaction.reply({ components: [errorContainer("Stop lying and set up your server!!")], flags: CFlags.CV2_EPH })
        }
      }
    }
  }
};

export default handler;
