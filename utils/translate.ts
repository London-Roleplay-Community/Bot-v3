import { Logger } from "commandkit";
import _trans from "googletrans";
const trans = _trans.default

/**
 * Returns the ENGLSIH translation
 * @param {string} text
 */
export async function translate(text: string) {
  try {
    const result = await trans(text, { to: 'en' });
    return { text: result.text, lang: result.src }
  } catch (error) {
    Logger.error(error);
    return false;
  }
}

/**
 * Returns the specified languageCode in that language
 * @param text 
 * @param languageCode 
 * @returns 
 */
export async function translateLang(text: string, languageCode: string) {
  try {
    const result = await trans(text, { to: languageCode })
    return { text: result.text, lang: result.src }
  } catch (error) {
    Logger.error(error);
    return false;
  }
}