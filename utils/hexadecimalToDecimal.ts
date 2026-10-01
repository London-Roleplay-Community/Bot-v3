import { HexColorString } from "discord.js";

export default function hexadecimalToDecimal(hex: HexColorString) {
  const splitted = split(hex);
  if (!splitted) return "#ffffff"
  if (!splitted.R || !splitted.G || !splitted.B) return "#ffffff"
  const rDec = parseInt(splitted.R, 16)
  const gDec = parseInt(splitted.G, 16)
  const bDec = parseInt(splitted.B, 16)

  return (rDec << 16) + (gDec << 8) + bDec
};

function split(hex: HexColorString) {
  const match = hex.match(/^#(?<R>[a-f\d]{1,2})(?<G>[a-f\d]{1,2})(?<B>[a-f\d]{1,2})$/i)
  if (!match || !match.groups) return null
  let {R,G,B} = match.groups as { R: string, G: string, B: string}
  // #f00 #fff #ff0 #0ff shortening
  if (R.length === 1) {
    R = R+R;
    G = G+G;
    B = B+B;
  }

  return {R,G,B}
}