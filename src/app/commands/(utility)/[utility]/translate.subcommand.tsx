import { type ChatInputCommand, type MessageCommand, type CommandData, Container, TextDisplay, Separator, AutocompleteCommand, Logger, Section, Thumbnail } from 'commandkit';
import { ApplicationCommandOptionType, Colors, EmbedBuilder, MessageFlags, SeparatorSpacingSize } from 'discord.js';
import { translate, translateLang } from '../../../utils/translate.ts';
import errorContainer from '../../../components/errorContainer.tsx';

const languages = [
  { name: 'English', value: 'en' },
  { name: 'Spanish', value: 'es' },
  { name: 'French', value: 'fr' },
  { name: 'German', value: 'de' },
  { name: 'Italian', value: 'it' },
  { name: 'Portuguese', value: 'pt' },
  { name: 'Dutch', value: 'nl' },
  { name: 'Russian', value: 'ru' },
  { name: 'Chinese', value: 'zh' },
  { name: 'Japanese', value: 'ja' },
  { name: 'Korean', value: 'ko' },
  { name: 'Arabic', value: 'ar' },
  { name: 'Hindi', value: 'hi' },
  { name: 'Bengali', value: 'bn' },
  { name: 'Urdu', value: 'ur' },
  { name: 'Turkish', value: 'tr' },
  { name: 'Vietnamese', value: 'vi' },
  { name: 'Thai', value: 'th' },
  { name: 'Polish', value: 'pl' },
  { name: 'Swedish', value: 'sv' },
  { name: 'Danish', value: 'da' },
  { name: 'Norwegian', value: 'no' },
  { name: 'Finnish', value: 'fi' },
  { name: 'Greek', value: 'el' },
  { name: 'Hebrew', value: 'he' },
  { name: 'Czech', value: 'cs' },
  { name: 'Hungarian', value: 'hu' },
  { name: 'Romanian', value: 'ro' },
  { name: 'Ukrainian', value: 'uk' },
  { name: 'Indonesian', value: 'id' },
  { name: 'Malay', value: 'ms' },
  { name: 'Filipino', value: 'fil' },
];

export const command: CommandData = {
  name: 'translate',
  description: "Translates a message",
  options: [
    {
      name: 'text',
      description: 'The text to translate',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'to',
      description: 'The specified language to translate to (if omitted, will be English)',
      type: ApplicationCommandOptionType.String,
      autocomplete: true,
      required: false
    }
  ]
};

export const autocomplete: AutocompleteCommand = async ({ interaction }) => {
  try {
    const input = interaction.options.getString("to", true);
    if (!input) {
      interaction.respond([{ name: 'Type in a language! 3+ characters required', value: '__' }])
      return;
    }
    if (input.length >= 3) {
      const list = languages.filter((language) => language.name.toLowerCase().includes(input.toLowerCase()))
      interaction.respond(list);
      return;
    } else {
      interaction.respond([{ name: 'Type in a language! 3+ characters required', value: '__' }])
      return;
    }
  } catch (error) {
    Logger.error(error);
  }
}

export const chatInput: ChatInputCommand = async ({interaction}) => {
  const toLang = interaction.options.getString("to");
  const text = interaction.options.getString("text", true);
  if (toLang) {
    const formattedLang = languages.find(language => language.value === toLang)?.name;
    const translated = await translateLang(text, toLang);
    if (translated === false) {
      return interaction.reply({ components: [errorContainer("An error occurred when attempting to translate this message")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
    } else {
      const formattedReturn = languages.find(language => language.value === translated.lang);
      const response = new EmbedBuilder().setAuthor({ iconURL: interaction.user.avatarURL()!, name: `${formattedLang} → ${formattedReturn}` }).setDescription(translated.text);

      return interaction.reply({ embeds: [response], flags: [MessageFlags.Ephemeral] })
    }
  } else {
    const formattedLang = "English";
    const translated = await translate(text);
    if (translated === false) {
      return interaction.reply({ components: [errorContainer("An error occurred when attempting to translate this message")], flags: [MessageFlags.IsComponentsV2, MessageFlags.Ephemeral] });
    } else {
      const formattedReturn = languages.find(language => language.value === translated.lang)?.name
      const response = new EmbedBuilder().setAuthor({ iconURL: interaction.user.avatarURL()!, name: `${formattedReturn} → ${formattedLang}` }).setDescription(translated.text);

      return interaction.reply({ embeds: [response], flags: [MessageFlags.Ephemeral] })
    }
  }
}; //TODO: Link up translate file with this and return that with jsx components