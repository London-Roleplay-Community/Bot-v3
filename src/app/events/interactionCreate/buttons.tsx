import type { EventHandler } from 'commandkit';
import errorContainer from '../../components/errorContainer.tsx';
import { CFlags } from '../../../../utils/types/CFlags.ts';
import successContainer from '../../components/successContainer.tsx';
import { guildsCollection } from '../../../../utils/configuration/database.ts';

const handler: EventHandler<'interactionCreate'> = async (interaction) => {
  if (!interaction.guildId || !interaction.guild) return;
  if (interaction.isButton()) {
    const [command, topic, userId] = interaction.customId.split("_");
    const interactionInfo = { command, topic, userId }
    if (interactionInfo.command === "setup") {
      if (interactionInfo.topic === "done") {
        const server = await guildsCollection.findOne({ id: interaction.guildId })
        if (!server) { interaction.reply({ components: [errorContainer("Could not fetch server from JSON!")], flags: CFlags.CV2_EPH }); return; }
        const channelLength = Object.keys(server.channels).length
        const categoryLength = Object.keys(server.categories).length
        if (channelLength === 7 && categoryLength === 2) {
          await guildsCollection.updateOne({ id: interaction.guild.id }, { $set: { completedSetup: true } })
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
