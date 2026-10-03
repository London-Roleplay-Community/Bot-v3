export interface ServerConfig {
  completedSetup: boolean,
  name: string,
  id: string,
  channels: Record<string, any>,
  categories: Record<string, any>
}

export function createGuildData(serverId: number|string, serverName: string) {
  return {
    servers: {
      [serverId.toString()]: {
        completedSetup: false,
        name: serverName,
        id: serverId,
        channels: {},
        categories: {}
      }
    }
  }
}