import { EventHandler, Logger } from "commandkit";

const handler: EventHandler<'guildMemberUpdate'> = async (old, newMember) => {
  if (!old.premiumSince && newMember.premiumSince) {
    try {
      await newMember.send({ content: "Thank you for boosting!! It really helps us with our outreach and support. It means a lot, tysm!!!\n -# Jaxon, Lead Developer @LRC" })
    } catch {
      Logger.log('Couldnt send DM to the new user')
    }
  }
}

export default handler;