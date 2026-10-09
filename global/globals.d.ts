import type { ActionRow, Button, ChannelSelectMenu, CheckboxGroup, CheckboxGroupOption, Container, Label, MentionableSelectMenu, Modal, PollAnswer, PollQuestion, RadioGroup, RadioGroupOption, RoleSelectMenu, Separator, StringSelectMenu, StringSelectMenuOption, TextDisplay, UserSelectMenu } from "commandkit";
import { InteractionDeferReplyOptions, InteractionReplyOptions, MessagePayload } from "discord.js";

declare global {
  //basic
  const Td: typeof TextDisplay
  const Sp: typeof Separator
  const Cnt: typeof Container
  const Acr: typeof ActionRow
  const Chsm: typeof ChannelSelectMenu
  const Rsm: typeof RoleSelectMenu
  const Btn: typeof Button
  const Usrsm: typeof UserSelectMenu
  const Mensm: typeof MentionableSelectMenu

  //modals
  const Mdl: typeof Modal
  const Lbl: typeof Label

  //polls
  const Pq: typeof PollQuestion
  const Pa: typeof PollAnswer

  //checkbox
  const ChkGrp: typeof CheckboxGroup
  const ChkGrpOp: typeof CheckboxGroupOption

  //radio
  const RdGrp: typeof RadioGroup
  const RdGrpOp: typeof RadioGroupOption

  //stringsel
  const StrSel: typeof StringSelectMenu
  const StrSelOp: typeof StringSelectMenuOption

  //yangon patches
  function reply(options: string | MessagePayload | InteractionReplyOptions): void;
  function deferReply(options?: InteractionDeferReplyOptions): void;
  function editReply(options: string | MessagePayload | InteractionDeferReplyOptions): void;
  function followUp(options: string | MessagePayload | InteractionReplyOptions): void;
  function deleteReply(message?: string): void;
  function componentReply(
    arg?: V2Components | (Omit<InteractionReplyOptions, "components"> & { components?: V2Components })
  ): void;
  function componentEphemeralReply(
    arg?: V2Components | (Omit<InteractionReplyOptions, "components"> & { components?: V2Components })
  ): void;}

export {}