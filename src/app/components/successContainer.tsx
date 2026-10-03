import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";
import hexadecimalToDecimal from "../../../utils/hexadecimalToDecimal.ts";

export default function successContainer(successMessage: StringEncodable) {
  return (
    <Container accentColor={hexadecimalToDecimal("#00dd0b")}>
      <TextDisplay>### ✅ Error</TextDisplay>
      <Separator/>
      <TextDisplay>{successMessage}</TextDisplay>
    </Container>
  )
}