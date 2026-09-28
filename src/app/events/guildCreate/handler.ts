import type { EventHandler } from "commandkit";
import { mClient } from "../../../app.ts";

const handler: EventHandler<'guildCreate'> = async (interaction) => {
  console.log("Joined server")
  await mClient.db("servers").collection(interaction.id).insertOne({ name: interaction.name, id: interaction.id, channels: {}, categories: {}, completedSetup: false })
}

export default handler;