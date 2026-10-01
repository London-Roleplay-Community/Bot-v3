/* eslint-disable no-unused-vars */
import path from "path";

export interface ServerInfoData {
  id: string,
  name: string,
  channels: {
    contextMenuReportLogs: string,
    noteLogs: string,
    actionLogs: string,
    inGameSanctions: string,
    transcriptChannel: string,
    modLogs: string,
    git: string
  };
  categories: {
    tickets: string,
    escTickets: string
  };
  completedSetup: boolean
}

export default interface ServerInfo {
  servers: Record<string, ServerInfoData>
}

export enum ServerUpdateError {
  NO_SUCH_SERVER_EXISTS = 1,
  UPDATE_FAILED = 2,
  READ_ERROR = 3,
}

export const jsonPath = path.resolve(process.cwd(), "utils", "configuration", "serverInfo.json")