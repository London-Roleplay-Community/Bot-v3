import { Client } from 'discord.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import dns from "dns";
import { Logger } from 'commandkit';
import { connect } from '../utils/configuration/database.ts';


dns.setServers(['1.1.1.1']);

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
});

function checkenv() {
  const vars = ["DISCORD_TOKEN", "AZURE_USERNAME", "AZURE_PASSWORD", "AZURE_ENDPOINT", "R2_ENDPOINT", "R2_SECRET_ACCESS_KEY", "R2_ACCESS_KEY_ID", "R2_BUCKET", "URL", "API", "API_KEY", "RBLX_APIKEY", "RANKING_COOKIE"]

  for (const v of vars) {
    if (!process.env[v]) {
      Logger.error(`Missing env var: ${v}`)
      process.exit(1)
    }
  }
}
checkenv()


await connect();

export default client;
