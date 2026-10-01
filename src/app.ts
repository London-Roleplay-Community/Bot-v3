import { Client } from 'discord.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from "dns";
import { Logger } from 'commandkit';
import { configureRatelimit } from "@commandkit/ratelimit";

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

//* Plugins
configureRatelimit({
  defaultLimiter: {
    maxRequests: 5,
    interval: '1m',
    scope: 'user',
    algorithm: 'fixed-window'
  }
})

export { mClient };
export default client;
