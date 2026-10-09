import { Snowflake } from "discord.js";
import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId,
  discord: {
    id: Snowflake,
    user: string
  },
  roblox: {
    id: string,
    user: string
  },
  verified: boolean,
  verifiedAt: Date
}