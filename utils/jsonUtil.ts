import { readFile, writeFile } from "fs/promises";
import ServerInfo, { ServerCreateError, ServerInfoData, ServerUpdateError, jsonPath } from "./types/jsonData.ts";
import { Logger } from "commandkit";

/**
 * Recursively changes every property to object type T
 */
type FuckConstructors<T> = {
  [P in keyof T]?: T[P] extends object ? FuckConstructors<T[P]> : T[P];
}
/**
 * [P in keyof T]? iterates over every key P in T, then makes properties optional
 * T[P] extends object ? conditional; checks if T[P] is an object; if T[P] is not an object, it directly returns T[P]; if it is, it calls itself again to recurse
 * FuckConstructors<T[P]> recrusively calls type if T[P] is an object; returns T[P] if the property is not an object
 * also the ? is essentially an if statement; if T[P] extends object, run FuckConstructors<T[P]>; else return T[P]
 */

/**
 * Accepts type T that will be string str
 * @param str The JSON string to parse
 * @returns Type T | undefined
 */
export const parse = <T>(str:string): T | undefined => {
  try {
    return JSON.parse(str) as T;
  } catch {
    return undefined
  }
}

export class Server implements ServerInfoData {
  name: string;
  channels: { contextMenuReportLogs: string; noteLogs: string; actionLogs: string; inGameSanctions: string; transcriptChannel: string; modLogs: string; git: string; };
  categories: { tickets: string; escTickets: string; };
  completedSetup: boolean;
  id: string

  constructor(data: FuckConstructors<ServerInfoData> = {}) {
    this.id = data.id ?? "0"
    this.name = data.name ?? "Uninitialized"
    this.channels = {
      contextMenuReportLogs: data.channels?.contextMenuReportLogs ?? "",
      noteLogs: data.channels?.noteLogs ?? "",
      actionLogs: data.channels?.actionLogs ?? "",
      inGameSanctions: data.channels?.inGameSanctions ?? "",
      transcriptChannel: data.channels?.transcriptChannel ?? "",
      modLogs: data.channels?.modLogs ?? "",
      git: data.channels?.git ?? "",
    };
    this.categories = {
      tickets: data.categories?.tickets ?? "",
      escTickets: data.categories?.escTickets ?? "",
    };

    this.completedSetup = data.completedSetup ?? false
  }

  toJSON(): ServerInfoData {
    return {
      id: this.id,
      name: this.name,
      channels: this.channels,
      categories: this.categories,
      completedSetup: this.completedSetup
    }
  }

  async save(updates?: FuckConstructors<ServerInfoData>): Promise<Server | ServerUpdateError> {
    if (updates) {
      if (updates.name !== undefined) this.name = updates.name;
      if (updates.completedSetup !== undefined) this.completedSetup = updates.completedSetup
      if (updates.channels) this.channels = { ...this.channels, ...updates.channels };
      if (updates.categories) this.categories = { ...this.categories, ...updates.categories }
    }

    try {
      let current: ServerInfo = { servers: {} }
      try {
        const contents = await readFile(jsonPath, "utf-8")
        const parsed = parse<ServerInfo>(contents)
        if (parsed && parsed.servers) current = parsed
      } catch (readerror) {
        Logger.error(`Failed to read json... ${readerror}`)
        return ServerUpdateError.READ_ERROR
      }
      if (!current.servers[this.id]) { Logger.error("No such server exists"); return ServerUpdateError.NO_SUCH_SERVER_EXISTS }
      current.servers[this.id] = this.toJSON();
      await writeFile(jsonPath, JSON.stringify(current, null, 2), "utf-8")
      
      return this
    } catch (error) {
      Logger.error(`Failed to save server..? ${this.id}... ${error}`)
      return ServerUpdateError.UPDATE_FAILED
    }
  }

  static async create(id: string, name: string = "Uninitialized"): Promise<Server|ServerCreateError> {
    const newServer = new Server({ id, name, channels: {}, categories: {}, completedSetup: false })
    try {
      let current: ServerInfo = { servers: {} }
      try {
        const contents = await readFile(jsonPath, "utf-8")
        const parsed = parse<ServerInfo>(contents)
        if (parsed && parsed.servers) current = parsed
      } catch (readerror) {
        Logger.warn(`Failed to read json when creating... ${readerror}`)
        return ServerCreateError.READ_ERROR
      }
      current.servers[id] = newServer.toJSON();
      await writeFile(jsonPath, JSON.stringify(current, null, 2), "utf-8")
      Logger.info(`initialized server (${newServer.name} | ${id})`)

      return newServer
    } catch (error) {
      Logger.error(`failed to initialize server... ${error}`)
      return ServerCreateError.UNKNOWN_ERROR
    }
  }
}

export const load = async (serverId: string): Promise<Server | undefined> => {
  try {
    const data = await readFile(jsonPath, "utf-8")
    const parsed = parse<ServerInfo>(data)

    if (parsed && parsed.servers && parsed.servers[serverId]) return new Server(parsed.servers[serverId])
    return undefined
  } catch (error) {
    Logger.error(`Was unable to read file... ${error}`)
    return undefined
  }
}

export function validateChannel(k: string): k is keyof ServerInfoData["channels"] {
  const valid: (keyof ServerInfoData["channels"])[] = [
    "contextMenuReportLogs",
    "noteLogs",
    "actionLogs",
    "inGameSanctions",
    "transcriptChannel",
    "modLogs",
    "git"
  ]

  return valid.includes(k as keyof ServerInfoData["channels"])
}

// not the best with these arrow functions;
// this is a function, not a method: essentially equivalent to a lambda function (java), with some minor changes

/**
 * Keyof: transforms into union of keys
 * "as keyof": type assertion; forces tsc to assume the variable matches the type
 * "key is keyof": type guard; narrows down type of K for whatever scope that follows the boolean check; e.g., the boolean check would be valid.includes(...)
 */