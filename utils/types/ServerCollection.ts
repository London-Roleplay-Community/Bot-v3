import { ObjectId } from "mongodb";

export default interface ServerCollection {
  _id: ObjectId,
  name: string,
  id: string,
  channels: Record<string, string>,
  categories: Record<string, string>,
  completedSetup: boolean
}