/**
 * Use only for events where there may be a risk that a user selects an object meant for another user
 * @returns {boolean}
 * @since v3.0.2
 * @author Jaxon Beltran
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function validateInteraction(interaction: any) : boolean {
  if (interaction.isAnySelectMenu()) {
    const parts = interaction.customId.split('_')
    if (!parts) return false;
    const split = parts[parts?.length - 1];
    if (interaction.user.id != split) {
      return false;
    }

    return true;
  } else if (interaction.isButton()) {
    const parts = interaction.customId.split('_')
    if (!parts) return false;
    const split = parts[parts?.length - 1];
    if (interaction.user.id != split) {
      return false;
    }

    return true;
  }

  return false;
}