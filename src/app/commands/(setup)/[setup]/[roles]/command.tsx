import { ChatInputCommandContext } from "commandkit";
import { SeparatorSpacingSize } from "discord.js";
import { CV2_EPH } from "../../../../../../utils/types/misc/CFlags.ts";

$: SlashCommand("Sets up roles for the server")
export default function roles({ interaction }: ChatInputCommandContext) {
  const response = (
    <Cnt>
      <Td># Roles setup</Td>
      <Sp spacing={SeparatorSpacingSize.Small}/>
      <Td>-# these roles will also be used for ticket permissions</Td>
      <Acr><Rsm customId={`rsetup_admin_${interaction.user.id}`} placeholder="Just choose the * role for this one"></Rsm></Acr>
      <Acr><Rsm customId={`rsetup_wia_${interaction.user.id}`} placeholder="Choose the WIA base role"/></Acr>
      <Acr><Rsm customId={`rsetup_ownership_${interaction.user.id}`} placeholder="Choose the ownership base role"/></Acr>
    </Cnt>
  )
  const response2 = (
    <Cnt>
      <Td>## Command roles</Td>
      <Td>-# these roles will also be used for ticket permissions</Td>
      <Sp spacing={SeparatorSpacingSize.Small}/>
      <Acr><Rsm customId={`rsetup_mpsCommand_${interaction.user.id}`} placeholder="Choose the MPS command role" /></Acr>
      <Acr><Rsm customId={`rsetup_bafCommand_${interaction.user.id}`} placeholder="Choose the BAF command role"/></Acr>
      <Acr><Rsm customId={`rsetup_lasCommand_${interaction.user.id}`} placeholder="Choose the LAS command role"/></Acr>
    </Cnt>
  )
  const response3 = (
    <Cnt>
      <Td>## Other roles</Td>
      <Td>-# these roles will also be used for ticket permissions</Td>
      <Sp spacing={SeparatorSpacingSize.Small}/>
      <Acr><Rsm customId={`rsetup_dev_${interaction.user.id}`} placeholder="Choose the developer role"/></Acr>
      <Acr><Rsm customId={`rsetup_devSupervisor_${interaction.user.id}`} placeholder="Choose the development supervisor role"/></Acr>
    </Cnt>
  )

  $: reply({ components: [response, response2, response3], flags: CV2_EPH })
}