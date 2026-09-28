import type { EventHandler } from 'commandkit';

const handler: EventHandler<'interactionCreate'> = async (interaction) => {
  if (interaction.isModalSubmit()) {
    // TODO
  }
};

export default handler;
