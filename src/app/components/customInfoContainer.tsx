import Colors from "@utils/configuration/colors.ts";
import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";

export default function customContainer(message: StringEncodable, title: StringEncodable) {
  return (
    <Container accentColor={Colors.SPECIAL_MESSAGE}>
      <TextDisplay>### {title}</TextDisplay>
      <Separator/>
      <TextDisplay>{message}</TextDisplay>
    </Container>
  )
}