import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";
import hexadecimalToDecimal from "../../../utils/hexadecimalToDecimal.ts";

export default function setupIncomplete(customMessage?: StringEncodable) {
  if (!customMessage) {
    return (
    <Container accentColor={hexadecimalToDecimal("#eb6200")}>
      <TextDisplay>### 🛠️ Success</TextDisplay>
      <Separator />
      <TextDisplay>Setup has not been completed for this server! Talk to an administrator to fix this problem.</TextDisplay>
    </Container>)
  }
};
