const ticket_mappings = {
  "mpsCommand": "Metropolitan Police Command",
  "bafCommand": "British Armed Forces Command",
  "lasCommand": "London Ambulance Service Command"
} as const;

export type TicketCode = keyof typeof ticket_mappings

export function getTicketCode(code: TicketCode): string {
  return ticket_mappings[code]
}
