import { type ChatInputCommand, type CommandData, Container, TextDisplay, Separator } from 'commandkit';
import { MessageFlags } from 'discord.js';

export const command: CommandData = {
  name: 'ping',
  description: "Ping the bot to check if it's online.",
};

export const chatInput: ChatInputCommand = async ({interaction}) => {
  const latency = (interaction.client.ws.ping ?? -1).toString();
  const response = (
    <Container>
      <TextDisplay># Ping</TextDisplay>
      <Separator/>
      <TextDisplay>Pong! Latency {latency}ms</TextDisplay>
    </Container>
  );

  await interaction.reply({ components: [response], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
};