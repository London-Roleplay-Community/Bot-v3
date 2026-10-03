import { Logger } from "commandkit";
import { MongoClient, ServerApiVersion } from "mongodb";
import { ServerConfig } from "./schema.ts";

export const mClient = new MongoClient(`mongodb+srv://${encodeURIComponent(process.env.AZURE_USERNAME!)}:${encodeURIComponent(process.env.AZURE_PASSWORD!)}@${process.env.AZURE_ENDPOINT}/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`, { serverApi: ServerApiVersion.v1 });

export const guilds = mClient.db("guilds")
export const guildsCollection = guilds.collection<ServerConfig>("guilds")

export async function connect() {
  try {
    await mClient.connect()
    Logger.log("Connected to Azure DB")
  } catch (error) {
    Logger.error(`Failed to connect to Azure ${error}`)
    process.exit(1)
  }
}