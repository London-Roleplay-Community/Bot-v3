import { MessageFlags } from "discord.js";

export const CFlags = {
  CV2: MessageFlags.IsComponentsV2,
  EPH: MessageFlags.Ephemeral,
  SILENT: MessageFlags.SuppressNotifications,
  NO_EMBEDS: MessageFlags.SuppressEmbeds,
  CV2_EPH: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]
} as const