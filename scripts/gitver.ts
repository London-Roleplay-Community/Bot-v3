/* eslint-disable @typescript-eslint/no-unused-expressions */
import fs from 'fs/promises';
import YAML from 'yaml'
import { Version } from '../utils/types/versionYaml.ts';
import { execSync } from 'child_process';
import { Logger } from 'commandkit';

(async () => {
    try {
    const output = execSync('git log -1 --pretty=format:"%H|%s"').toString("utf-8").trim()
    const [hash,title] = output.split("|")
    if (!hash || !title) throw new Error("Could not find git commit or hash")
    const raw = await fs.readFile('/VERSION.yaml', 'utf-8')
    const parsed = YAML.parse(raw) as Version
    parsed.git.hash = hash
    parsed.git.title = title
  } catch (error) {
    Logger.error(error)
  }
})