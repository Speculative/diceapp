import * as ohm from "ohm-js";

export const diceGrammar = ohm.grammar(`
  DiceLang {
    Program = Roll
    Roll = Number "d" Number

    Number = digit+
  }
`);
