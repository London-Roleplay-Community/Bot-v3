import { ChatInputCommandContext, Container } from "commandkit";
import fs from "fs/promises"
import path from "path";
import YAML from "yaml"
import { Version } from "../../../../../../../utils/types/misc/versionYaml.ts";
import customContainer from "../../../../../components/customInfoContainer.tsx";
import hexadecimalToDecimal from "../../../../../../../utils/code/hexadecimalToDecimal.ts";
import { CFlags, CV2_EPH } from "../../../../../../../utils/types/misc/CFlags.ts";

$: SlashCommand("Gets the local git information")
export default async function info({ interaction }: ChatInputCommandContext) {
  const file =  await fs.readFile(path.resolve(process.cwd(), "VERSION.yaml"), 'utf-8')
  const parsed = YAML.parse(file) as Version
  return interaction.reply({ components: [customContainer(`**Hash:** ${parsed.git.hash}\n**Msg:** ${parsed.git.title}`, "🛠️ Git info", hexadecimalToDecimal("#eb6200"))], flags: CV2_EPH })
}