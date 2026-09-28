import { Container, Separator, StringEncodable, TextDisplay } from "commandkit";

export default function successContainer(successMessage: StringEncodable) {
  return (
    <Container>
      <TextDisplay>### ✅ Error</TextDisplay>
      <Separator/>
      <TextDisplay>{successMessage}</TextDisplay>
    </Container>
  )
}