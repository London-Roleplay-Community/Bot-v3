import { Logger } from "commandkit";
import { MongoClient, ServerApiVersion } from "mongodb";
import { ServerConfig } from "../types/db/dbDecs.ts";
import { User } from "@utils/types/db/users.ts";

if (!process.env.MONGODB_URI) {
  throw new Error("No mongodb uri")
}

export const mClient = new MongoClient(process.env.MONGODB_URI ,{ serverApi: ServerApiVersion.v1 });

export const guilds = mClient.db("servers")
export const guildsCollection = guilds.collection<ServerConfig>("server_info")

export const roblox = mClient.db("roblox")
export const groups = roblox.collection<Record<string,string>>("groups")
export const users = roblox.collection<User>("users")

export async function connect() {
  try {
    await mClient.connect()
    Logger.log("Connected to MongoDB")
  } catch (error) {
    Logger.error(`Failed to connect to mongodb ${error}`)
    process.exit(1)
  }
}