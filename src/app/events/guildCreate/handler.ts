import { type EventHandler, Logger } from "commandkit";
import { guildsCollection } from "../../../../utils/configuration/database.ts";
import { createGuildData } from "@utils/types/db/dbDecs.ts";

const handler: EventHandler<'guildCreate'> = async (interaction) => {
  try {
    await guildsCollection.updateOne({ id: interaction.id }, { $setOnInsert: createGuildData(interaction.id, interaction.name) }, { upsert: true })
    Logger.log(`Initialized server for ${interaction.name}`)
  } catch (error) {
    Logger.error(`Failed to create document in mongodb... ${error}`)
  }
}

export default handler;