import { type EventHandler, Logger } from "commandkit";
import { createGuildData } from "../../../../utils/configuration/schema.ts";
import { guildsCollection } from "../../../../utils/configuration/database.ts";

const handler: EventHandler<'guildCreate'> = async (interaction) => {
  try {
    await guildsCollection.updateOne({ id: interaction.id }, { $setOnInsert: createGuildData(interaction.id, interaction.name) }, { upsert: true })
    Logger.log(`Initialized server for ${interaction.name}`)
  } catch (error) {
    Logger.error(`Failed to create document in Azure... ${error}`)
  }
}

export default handler;