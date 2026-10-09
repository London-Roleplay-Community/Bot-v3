import { ActionRow, Button, ChannelSelectMenu, CheckboxGroup, CheckboxGroupOption, Container, Label, MentionableSelectMenu, Modal, PollAnswer, PollQuestion, RadioGroup, RadioGroupOption, RoleSelectMenu, Separator, StringSelectMenu, StringSelectMenuOption, TextDisplay, UserSelectMenu } from "commandkit";

export default function dts() {
  Object.assign(globalThis, {
    //basic
    Td: TextDisplay,
    Sp: Separator,
    Cnt: Container,
    Acr: ActionRow,
    Chsm: ChannelSelectMenu,
    Rsm: RoleSelectMenu,
    Btn: Button,
    Usrsm: UserSelectMenu,
    Mensm: MentionableSelectMenu,

    //modals
    Mdl: Modal,
    Lbl: Label,

    //polls
    Pq: PollQuestion,
    Pa: PollAnswer,

    // checkbox
    ChkGrp: CheckboxGroup,
    ChkGrpOp: CheckboxGroupOption,

    //radio
    RdGrp: RadioGroup,
    RdGrpOp: RadioGroupOption,

    //stringsel
    StrSel: StringSelectMenu,
    StrSelOp: StringSelectMenuOption,
  });
}
