import fs from 'fs/promises';
import YAML from 'yaml'
import path from 'path'
import { Version } from '../utils/types/misc/versionYaml.ts';
import { execSync } from 'child_process';
import { Logger } from 'commandkit';

(async () => {
    try {
    const output = execSync('git log -1 --pretty=format:"%h|%s"').toString("utf-8").trim()
    const [hash,title] = output.split("|")
    if (!hash || !title) throw new Error("Could not find git commit or hash")
    const raw = await fs.readFile(path.resolve(process.cwd(), 'VERSION.yaml'), 'utf-8')
    const parsed = YAML.parse(raw) as Version
    if (parsed.git.hash === hash) {
      Logger.log("Up-to-date")
      return
    }
    parsed.git.hash = hash
    parsed.git.title = title

    await fs.writeFile(path.resolve(process.cwd(), 'VERSION.yaml'), YAML.stringify(parsed), 'utf-8')
    Logger.log("Successfully wrote to VERSION.yaml")
  } catch (error) {
    Logger.error(error)
  }
})();