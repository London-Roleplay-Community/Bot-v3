import { Container, TextDisplay, Separator, ActionRow, ChannelSelectMenu, ChatInputCommandContext } from 'commandkit';
import { ChannelType, SeparatorSpacingSize } from 'discord.js';
import { CV2 } from '../../../../../../utils/types/misc/CFlags.ts';

$: SlashCommand("Sets up channels for the bot")
export default function channels({ interaction }: ChatInputCommandContext) { 
  const setupReply = (
    <Container>
        <TextDisplay># Setup</TextDisplay>
        <TextDisplay>-# note that if you&apos;ve already assigned a value to one of these, it&apos;s saved! no need to re-assign it! :)</TextDisplay>
        <Separator spacing={SeparatorSpacingSize.Small}/>
        <TextDisplay>## Channels</TextDisplay>
        <TextDisplay>**Ticket transcripts:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_transcriptChannel_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Discord sanction logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_modLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Context menu reports:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_contextMenuReportLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Note logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_noteLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**Action logs (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_actionLogs_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
        <TextDisplay>**In-game sanctions (forum channel):**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`setup_inGameSanctions_${interaction.user.id}`} channelTypes={[ ChannelType.GuildForum ]}/></ActionRow>
      </Container>
  );

  return interaction.reply({ components: [setupReply], flags: [ CV2 ] })
};