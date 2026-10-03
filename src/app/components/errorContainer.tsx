import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";
import hexadecimalToDecimal from "../../../utils/hexadecimalToDecimal.ts";

export default function errorContainer(errorMessage: StringEncodable) {
  return (
    <Container accentColor={hexadecimalToDecimal("#ff0101")}>
      <TextDisplay>### ❌ Error</TextDisplay>
      <Separator/>
      <TextDisplay>An error occurred: {errorMessage}</TextDisplay>
    </Container>
  )
}