import { fetchApi, isAnyErrorResponse } from "rozod";
import { getCloudV2GroupsGroupIdMemberships } from "rozod/opencloud/v2/cloud";

export default async function fetchGroupRole(groupId: string, userId: string): Promise<{ success: boolean, code?: string, role?: string }> {
  const response = await fetchApi(getCloudV2GroupsGroupIdMemberships, { group_id: groupId, filter: `filter=user == 'users/${userId}'` })
  if (!response || isAnyErrorResponse(response)) {
    return { success: false, code: response.code?.toString() }
  }

  return { success: true, role: response.groupMemberships[0]?.role }
}

