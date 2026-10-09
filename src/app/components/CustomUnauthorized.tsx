import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";
import hexadecimalToDecimal from "../../../utils/code/hexadecimalToDecimal.ts";
import Colors from "@utils/configuration/colors.ts";

export default function CustomUnauthorized(note: StringEncodable) {
  return (
    <Container accentColor={hexadecimalToDecimal(Colors.SPECIAL_MESSAGE)}>
      <TextDisplay>### 🚫 Unauthorized</TextDisplay>
      <Separator/>
      <TextDisplay>You are not authorized to use this command.</TextDisplay>
      <TextDisplay>-# {note}</TextDisplay>
    </Container>
  )
}