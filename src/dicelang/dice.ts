import * as ohm from "ohm-js";
import { randomInteger, range, sum } from "remeda";

export const diceGrammar = ohm.grammar(String.raw`
  DiceLang {
    Program = Roll
    Roll = Number "d" Number

    Number = "-"? digit+
  }
`);

export const diceSemantics = diceGrammar
  .createSemantics()
  .addOperation("eval", {
    Roll: (num1, _, num2) => {
      const dCount = Math.max(num1.eval(), 0);
      const dSize = Math.max(num2.eval(), 0);

      if (dSize === 0) {
        return 0;
      }

      return sum(range(0, dCount).map(() => randomInteger(1, dSize)));
    },

    Number: (sign, digits) => {
      return parseInt(sign.sourceString + digits.sourceString);
    },
  });
