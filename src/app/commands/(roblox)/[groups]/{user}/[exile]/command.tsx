import { ChatInputCommandContext, Logger } from "commandkit";
import { ApplicationCommandOptionType, MessageFlags } from "discord.js";
import { fetchApi, isAnyErrorResponse } from "rozod";
import { postUsernamesUsers } from "rozod/endpoints/usersv1";
import { users } from "@utils/configuration/database.ts";
import { CV2_EPH } from "@utils/types/misc/CFlags.ts";
import VerificationRequired from "@/app/components/VerificationRequired.tsx";
import HttpError from "@/app/components/HttpError.tsx";
import fetchGroupRole from "@utils/functions/http/open-cloud/GET/groups/fetchGroupRole/file.ts";
import GetRoleInfo from "@utils/functions/http/open-cloud/GET/groups/getRoleInfo/file";
import Unauthorized from "@/app/components/Unauthorized.tsx";
import ExileUser from "@utils/functions/http/open-cloud/DELETE/groups/exileUser/file.ts";
import successContainer from "@/app/components/successContainer.tsx";
import { getGroupNameById, groupData, validId } from "@utils/configuration/groups.ts";
import errorContainer from "@/app/components/errorContainer.tsx";

$: SlashCommand("Exile a user from a group");
export default async function exile({ interaction }: ChatInputCommandContext) {
  const roblox_user = $param(ApplicationCommandOptionType.String, {
    description: "The roblox user to exile",
    required: true,
  });
  const group = $param(ApplicationCommandOptionType.String, {
    description: "The group to exile the user from",
    required: true,
    autocomplete: async ({ interaction }) => {
      const focused = interaction.options.getFocused(true);
      if (focused.name !== "group") return interaction.respond([]);

      const input = focused.value.toLowerCase();
      if (input.length <= 2) return interaction.respond([]);

      try {
        const groups = groupData;
        return interaction.respond(
          Object.entries(groups)
            .filter(([, name]) => name.toLowerCase().includes(input))
            .slice(0, 25)
            .map(([id, name]) => ({ name, value: id })));
      } catch (err) {
        console.error("autocomplete fail", err);
        return interaction.respond([]);
      }
    }
  });
  const reason = $param(ApplicationCommandOptionType.String, {
    description: "The reason why the user is being exiled",
    required: true,
    minLength: 14
  });
  // End params
  if (!roblox_user || !group || !reason) return // don't know why this is required, but ensure they're nonnull since yangonkit doesn't have that options
  const user = await fetchApi(postUsernamesUsers, {
    body: { usernames: [roblox_user], excludeBannedUsers: true },
  });

  if (isAnyErrorResponse(user)) { $: reply({ components: [HttpError(user.code?.toString())], flags: CV2_EPH }); return; }
  if (!user || !user.data[0]) { $: reply({ components: [HttpError("404")], flags: CV2_EPH }); return; }
  
  //finally get around to doing shit
  const executor = await users.findOne({ [`discord.id`]: interaction.user.id })
  const victim = user.data[0].id
  if (!executor) { $: componentEphemeralReply([VerificationRequired()]); return; } // holy SHIT im tired

  //checks & making requests
  const executorId = executor.roblox.id
  const executorRequest = await fetchGroupRole(group, executorId)
  const victimRequest = await fetchGroupRole(group, victim.toString())

  if (!executorRequest.success || !victimRequest.success) {
    if (!executorRequest.success) {
      $: componentEphemeralReply([HttpError(executorRequest.code)])
    } else {
      $: componentEphemeralReply([HttpError(victimRequest.code)])
    }
    return;
  }

  if (!victimRequest.role || !executorRequest.role) return;
  
  const victimRole = await GetRoleInfo(group, victimRequest.role); const exeuctorRole = await GetRoleInfo(group, victimRequest.role);
  if (!exeuctorRole.success || !victimRole.success || !victimRole.role || !exeuctorRole.role) {
    $: componentEphemeralReply([HttpError()])
    return;
  }
  if (victimRole.role.rank >= exeuctorRole.role.rank) {
    $: componentEphemeralReply([Unauthorized(`Your role is ${exeuctorRole.role.displayName} (${exeuctorRole.role.rank}); their role is ${victimRole.role.displayName} (${victimRole.role.rank})`)])
  }

  // actually exile
  const exileRequest = await ExileUser(group, victim)
  if (!validId(group)) { $: componentEphemeralReply([errorContainer("Your group is invalid. Report this to the developers.")]); Logger.log(group); return; };

  if (!exileRequest.success) {
    if (!validId(group)) { $: reply({ components: [HttpError(exileRequest.code?.toString())], flags: CV2_EPH }); Logger.log(group); return; };
  }
  
  $: componentEphemeralReply([successContainer(`You have successfully exiled ${user.data[0].name} from ${getGroupNameById(group)}`)])
  return
}
