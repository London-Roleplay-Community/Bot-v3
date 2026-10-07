import { Client } from 'discord.js';
import dns from "dns";
import { Logger } from 'commandkit';
import { connect } from '../utils/configuration/database.ts';

import { fetchApi, configureServer, isAnyErrorResponse } from 'rozod'
import { getUsersAuthenticated } from 'rozod/endpoints/usersv1';

//* fix mongo refusing to connect
dns.setServers(['1.1.1.1']);

// Discord & mongo

const client = new Client({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent', 'GuildMessageReactions'],
});

await connect();

// Roblox
configureServer({
  cookies: process.env.RANKING_COOKIE,
  cloudKey: process.env.RBLX_APIKEY
})
const me = await fetchApi(getUsersAuthenticated, undefined)
if (!isAnyErrorResponse(me)) {
  Logger.log(`Logged in as ${me.name}`)
}


export default client;