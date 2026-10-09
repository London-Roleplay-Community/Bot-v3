import { ActionRow, Button, ChannelSelectMenu, ChatInputCommandContext, Container, Separator, TextDisplay } from "commandkit";
import { ButtonStyle, ChannelType, SeparatorSpacingSize } from "discord.js";
import { CV2_EPH } from "../../../../../../utils/types/misc/CFlags.ts";

$: SlashCommand("Sets up categories for the server")
export default function categories({ interaction }: ChatInputCommandContext) {
  const setupReply2 = (
      <Container> 
        <TextDisplay>## Categories</TextDisplay>
        <TextDisplay>**Tickets:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`catsetup_tickets_${interaction.user.id}`} channelTypes={[ChannelType.GuildCategory]} /></ActionRow>
        <TextDisplay>**Escalated tickets:**</TextDisplay>
        <ActionRow><ChannelSelectMenu customId={`catsetup_escTickets_${interaction.user.id}`} channelTypes={[ChannelType.GuildCategory]} /></ActionRow>
        <Separator spacing={SeparatorSpacingSize.Small}/>
      {/* <ActionRow>
        <Button customId={`setup_done_${interaction.user.id}`} style={ButtonStyle.Success}>I am done setting the server up</Button>
      </ActionRow> */}
      </Container>
  )

  return interaction.reply({ components: [setupReply2], flags: CV2_EPH })
}