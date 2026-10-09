import Colors from "@utils/configuration/colors.ts";
import { Container, Separator, TextDisplay } from "commandkit";

export default function HttpError(code: string = "Unknown") {
  return (
    <Container accentColor={Colors.DEVELOPMENT}>
      <TextDisplay>### HTTP Error</TextDisplay>
      <Separator/>
      <TextDisplay>The specified action had an error when attempting to make an HTTP request.</TextDisplay>
      <TextDisplay>-# HTTP {code}</TextDisplay>
    </Container>
  )
}