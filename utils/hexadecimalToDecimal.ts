import { ColorResolvable, HexColorString } from "discord.js";


/**
 * Converts a standard base-16 hexadecimal code to a base-10 decimal code
 * @param hex The hexadecimal code to convert
 * @returns 
 */
export default function hexadecimalToDecimal(hex: HexColorString): ColorResolvable {
  const splitted = split(hex);
  if (!splitted) return "16777215" as unknown as ColorResolvable
  if (!splitted.R || !splitted.G || !splitted.B) return "16777215" as unknown as ColorResolvable
  const rDec = parseInt(splitted.R, 16) //* these parse base16 -> base10
  const gDec = parseInt(splitted.G, 16)
  const bDec = parseInt(splitted.B, 16)

  return (rDec << 16) + (gDec << 8) + bDec //* lshift so we can give each color their own byte
};

/**
 * Splits a hexadecimal color code into groups of RR, GG, and BB to prepare for base-10 conversion
 * @param hex The hexadecimal code
 * @returns 
 */
function split(hex: HexColorString): {R: string; G: string; B: string} | null {
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

// each digit is 4 bits, so FF would be one byte
// FF FF FF would be 3 bytes, 3*8 = 24, so we can split each color across 3 sections by lshifting green by 8 and red by 16
// this essentially re-establishes the RR GG BB, however over a base-10 system
// 0x00FF00 is equivalent to 65280 in base-10; Green = FF = 255; 255 << 8 (mathematically equivalent to 255*2^8) equals 65280
// 0x0F0F0F is equivalent to 986895; a dark shade of gray. if the entire code is equivalent, it will always appear anywhere from black to white
// 0x0F0F0F: 0F = 15
// (15*2^16) + (15*2^8) + 15 or (15 << 16) + (15 << 8) + 15