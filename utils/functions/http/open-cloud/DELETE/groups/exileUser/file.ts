import { fetchApi, isAnyErrorResponse } from "rozod";
import { deleteGroupsGroupidUsersUserid } from "rozod/endpoints/groupsv1";

export default async function ExileUser(group_id: string, userId: number): Promise<{ success: boolean, code?: string|number }> {
  const request = await fetchApi(deleteGroupsGroupidUsersUserid, {
    groupId: Number(group_id), userId
  })
  if (isAnyErrorResponse(request) || !request) {
    return { success: false, code: request.code }
  }

  return { success: true }
}