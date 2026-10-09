export type ViableRoles = "wia" | "admin" | "ownership" | "dev" | "devSupervisor" | "mpsCommand" | "lasCommand" | "bafCommand"
export type IsViableRole<T> = T extends ViableRoles ? T : never