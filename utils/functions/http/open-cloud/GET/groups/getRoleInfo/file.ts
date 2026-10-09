import { fetchApi, isAnyErrorResponse } from "rozod";
import { getCloudV2GroupsGroupIdRolesRoleId } from "rozod/opencloud/v2/cloud";

export default async function GetRoleInfo(group_id: string, role_id: string): Promise<___GET_GROUP_ROLE> {
  const request = await fetchApi(getCloudV2GroupsGroupIdRolesRoleId, { role_id, group_id })
  if (isAnyErrorResponse(request) || !request) {
    return { success: false, code: request.code?.toString() }
  }

  return { success: true, role: { displayName: request.displayName, rank: request.rank.toString() } }
}

/** @internal */
type ___GET_GROUP_ROLE = {
  success: boolean,
  role?: {
    displayName: string,
    rank: string,
  },
  code?: string
}