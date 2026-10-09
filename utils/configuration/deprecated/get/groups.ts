import { apiClient } from "@utils/interceptors/api.ts"

export interface GetGroupsResponse {
  [id:string]: string
}

/** @deprecated */
export async function getGroups(): Promise<GetGroupsResponse> {
  const res = await apiClient.get<GetGroupsResponse>("/get/groups")
  return res.data
}