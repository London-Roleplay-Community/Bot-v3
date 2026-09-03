import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";

export default function errorContainer(errorMessage: StringEncodable) {
  return (
    <Container>
      <TextDisplay>### ❌ Error</TextDisplay>
      <Separator/>
      <TextDisplay>An error occurred: {errorMessage}</TextDisplay>
    </Container>
  )
}