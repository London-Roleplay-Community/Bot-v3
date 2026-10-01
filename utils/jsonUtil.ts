import { readFile, writeFile } from "fs/promises";
import ServerInfo, { ServerInfoData, ServerUpdateError, jsonPath } from "./types/jsonData.ts";
import { Logger } from "commandkit";

export const parse = <T>(str:string): T | undefined => {
  try {
    return JSON.parse(str) as T;
  } catch {
    return undefined
  }
}

export const load = async (serverId: string, path: string = jsonPath): Promise<ServerInfoData | undefined> => {
  try {
    const data = await readFile(path, "utf-8")
    const parsed = parse<ServerInfo>(data)
    if (parsed && parsed.servers) {
      return parsed.servers[serverId]
    }
    return undefined;
  } catch (error) {
    Logger.error(`unable to read file... ${error}`)
    return undefined
  }
}

export async function create(id: string, name: string = "Uninitialized"): Promise<ServerInfoData | undefined> {
  const server: ServerInfoData = {
    id: id,
    name: name,
    channels: {} as ServerInfoData['channels'],
    categories: {} as ServerInfoData['categories'],
    completedSetup: false
  }
  try {
    let current: ServerInfo = { servers: {} }
    try {
      const contents = await readFile(jsonPath, "utf-8")
      const parsed = parse<ServerInfo>(contents)
      if (parsed && parsed.servers) current = parsed;
    } catch (read) {
      Logger.warn(`failed to read json... ${read}`)
    }
    current.servers[id] = server;
    await writeFile(jsonPath, JSON.stringify(current, null, 2), "utf-8")

    Logger.info(`initialized server for ${server.name} (${id})`)
    return server
  } catch (error) {
    Logger.error(`failed to initialize server: ${error}`)
    return undefined
  }
}

export async function update(serverId: string, updates: Partial<ServerInfoData>): Promise<ServerInfoData | ServerUpdateError > {
  try {
    let current: ServerInfo = { servers: {} }
    try {
      const contents = await readFile(jsonPath, "utf-8")
      const parsed = parse<ServerInfo>(contents)
      if (parsed && parsed.servers) current = parsed
    } catch (read) {
      Logger.error(`failed to read json while updating... ${read}`)
      return ServerUpdateError.READ_ERROR
    }
    const existing = current.servers[serverId]
    if (!existing) {
      Logger.error("No such server exists")
      return ServerUpdateError.NO_SUCH_SERVER_EXISTS
    }
    const updated: ServerInfoData = {
      ...existing, ...updates,
      channels: {
        ...existing.channels, ...updates.channels
      },
      categories: {
        ...existing.categories, ...updates.categories
      }
    }

    current.servers[serverId] = updated;
    await writeFile(jsonPath, JSON.stringify(current, null, 2), "utf-8")
    return updated
  } catch (error) {
    Logger.error(`failed to update...  ${error}`)
    return ServerUpdateError.UPDATE_FAILED
  }
}


// not the best with these arrow functions;
// this is a function, not a method: essentially equivalent to a lambda function (java), with some minor changes