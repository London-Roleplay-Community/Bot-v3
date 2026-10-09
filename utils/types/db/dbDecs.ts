/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ServerData {
  completedSetup: boolean;
  name: string;
  id: string;
  channels: Record<string, any>;
  categories: Record<string, any>;
  roles: Record<string, any>;
}
export interface ServerConfig {
  servers: Record<string, ServerData>
}

export function createGuildData(serverId: string, serverName: string): ServerConfig {
  return {
    servers: {
      [serverId]: {
        completedSetup: false,
        name: serverName,
        id: serverId,
        channels: {},
        categories: {},
        roles: {},
      },
    },
  };
}