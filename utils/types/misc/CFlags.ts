import { MessageFlags } from "discord.js";

/**
 * @deprecated Use other exported consts instead
 */
export const CFlags = {
  CV2: MessageFlags.IsComponentsV2,
  EPH: MessageFlags.Ephemeral,
  SILENT: MessageFlags.SuppressNotifications,
  NO_EMBEDS: MessageFlags.SuppressEmbeds,
  CV2_EPH: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2]
} as const

export const CV2 = MessageFlags.IsComponentsV2
export const EPH = MessageFlags.Ephemeral
export const SILENT = MessageFlags.SuppressNotifications
export const NO_EMBED = MessageFlags.SuppressEmbeds
export const CV2_EPH = MessageFlags.Ephemeral | MessageFlags.IsComponentsV2