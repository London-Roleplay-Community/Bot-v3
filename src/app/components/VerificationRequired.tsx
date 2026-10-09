import { Container, Separator, TextDisplay } from "commandkit";
import hexadecimalToDecimal from "../../../utils/code/hexadecimalToDecimal.ts";

export default function VerificationRequired() {
  return (
    <Container accentColor={hexadecimalToDecimal("#2baae8")}>
      <TextDisplay>### 🕥 Verification Required</TextDisplay>
      <Separator/>
      <TextDisplay>You must be verified to run this command!</TextDisplay>
      <TextDisplay>-# to verify, run the `/verify start` command</TextDisplay>
    </Container>
  )
}