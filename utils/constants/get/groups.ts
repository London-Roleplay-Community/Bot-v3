import { apiClient } from "../../interceptors/api.ts";
import GetGroupsResponse from "../../types/api/get/groups/response.ts";

export async function getGroups(): Promise<GetGroupsResponse> {
  const res = await apiClient.get<GetGroupsResponse>("/get/groups")
  return res.data
}