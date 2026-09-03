import { Client } from 'discord.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from "dns";
import { Logger } from 'commandkit';

dns.setServers(['1.1.1.1']);

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
});

const mClient = new MongoClient(process.env.DB_CONNECTION!, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true } });

(async () => {
  try {
    await mClient.connect();
    Logger.info(`MongoDB connected`)
  } catch (error) {
    Logger.error(error)
  }
})();

export { mClient };
export default client;
