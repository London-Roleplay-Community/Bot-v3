import { type ChatInputCommand, type CommandData, Container, TextDisplay, Separator, ActionRow, ChannelSelectMenu, Button } from 'commandkit';
import { ButtonStyle, ChannelType, MessageFlags, SeparatorSpacingSize } from 'discord.js';

export const command: CommandData = {
  name: 'setup',
  description: "Sets up the bot",
};

export const chatInput: ChatInputCommand = async ({interaction}) => {
  const setupReply = (
    <Container>
        <TextDisplay># Setup</TextDisplay>
        <TextDisplay>-# note that if you&apos;ve already assigned a value to one of these, it&apos;s saved! no need to re-assign it! :)</TextDisplay>
        <Separator spacing={SeparatorSpacingSize.Small}/>
        <TextDisplay>## Channels</TextDisplay>
        <TextDisplay>**Ticket transcripts:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_transcriptChannel_${interaction.user.id}`} channelTypes={[ ChannelType.GuildText, ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Discord sanction logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_modLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Git:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_git_${interaction.user.id}`} channelTypes={[ ChannelType.GuildText, ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Context menu reports:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_contextMenuReportLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildText, ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Note logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_noteLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Action logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_actionLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**In-game sanctions (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_inGameSanctions_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        </Container>
  );
  const setupReply2 = (
      <Container> 
        <TextDisplay>## Categories</TextDisplay>
        <TextDisplay>**Tickets:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`catsetup_tickets_${interaction.user.id}`} channelTypes={[ChannelType.GuildCategory]} /></ActionRow>
        <TextDisplay>**Escalated tickets:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`catsetup_escTickets_${interaction.user.id}`} channelTypes={[ChannelType.GuildCategory]} /></ActionRow>
        <Separator spacing={SeparatorSpacingSize.Small}/>
      <ActionRow>
        <Button customId={`setup_done_${interaction.user.id}`} style={ButtonStyle.Success}>I am done setting the server up</Button>
      </ActionRow>
      </Container>
  )

  return interaction.reply({ components: [setupReply, setupReply2], flags: [ MessageFlags.IsComponentsV2 ] })
};