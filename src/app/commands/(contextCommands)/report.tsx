import { ActionRow, Button, CommandData, CommandMetadata, Container, MessageContextMenuCommand, Section, Separator, TextDisplay, UserContextMenuCommand } from 'commandkit';
import { ButtonStyle, MessageFlags, SeparatorSpacingSize } from 'discord.js';
import errorContainer from '../../components/errorContainer.tsx';

export const command: CommandData = {
  name: "report-message",
  description: "Reports a message",
  
}

export const messageContextMenu: MessageContextMenuCommand = async({ interaction }) => {
  const content = interaction.targetMessage.content;
  if (interaction.targetMessage.author.bot) return interaction.reply({ components: [errorContainer("You cannot report a bot!")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
  const response = (
    <Container>
      <TextDisplay>## User Reported</TextDisplay>
      <Separator spacing={SeparatorSpacingSize.Large}/>
      <TextDisplay>**Reported user:** {`${interaction.targetMessage.author}`}</TextDisplay>
      <TextDisplay>**Content:** {content}</TextDisplay>
    </Container>
  )
  const section = (
    <ActionRow>
      <Button style={ButtonStyle.Link} url={interaction.targetMessage.url}>Go to message</Button>
    </ActionRow>
  )

  await interaction.reply({ components: [response, section], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
}

export const userContextMenu: UserContextMenuCommand = async({ interaction }) => {
  if (interaction.targetUser.bot) return interaction.reply({ components: [errorContainer("You cannot report a bot!")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
  const response = (
    <Container>
      <TextDisplay>## User Reported</TextDisplay>
      <Separator spacing={SeparatorSpacingSize.Large}/>
      <TextDisplay>**Reported user:** {`${interaction.targetUser}`}</TextDisplay>
      <TextDisplay>**Reporter:** {`${interaction.user}`}</TextDisplay>
    </Container>
  );

  await interaction.reply({ components: [response], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] })
}

export const metadata: CommandMetadata = {
  nameAliases: {
    user: "Report User",
    message: "Report Message"
  }
}