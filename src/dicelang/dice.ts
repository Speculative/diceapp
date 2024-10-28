import * as ohm from "ohm-js";
import { randomInteger, range, sum } from "remeda";

export const diceGrammar = ohm.grammar(String.raw`
DiceLang {
  Program = ASExpr
  ASExpr =
    | ASExpr "+" ASExpr -- add
    | ASExpr "-" ASExpr -- sub
    | Roll
    | MDExpr
  MDExpr =
    | MDExpr "*" MDExpr -- mul
    | MDExpr "/" MDExpr -- div
    | ExpExpr
  ExpExpr =
    | ExpExpr "^" ExpExpr -- exp
    | ParenExpr
  ParenExpr =
    | "(" ASExpr ")" -- parens
    | Number
  Roll = ParenExpr "d" ParenExpr
  Number = "-"? digit+
}
`);

export const diceSemantics = diceGrammar
  .createSemantics()
  .addOperation("eval", {
    ASExpr_add: (num1, _, num2) => num1.eval() + num2.eval(),
    ASExpr_sub: (num1, _, num2) => Math.max(num1.eval() - num2.eval(), 0), // TODO: negatives should be zeroed only at the top level?
    MDExpr_mul: (num1, _, num2) => num1.eval() * num2.eval(),
    MDExpr_div: (num1, _, num2) => Math.floor(num1.eval() / num2.eval()),
    ExpExpr_exp: (num1, _, num2) => Math.pow(num1.eval(), num2.eval()),
    ParenExpr_parens: (_, num, __) => num.eval(),

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
