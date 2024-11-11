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
  Number = "-"? digit+ (":" ident)?
  ident = (letter | "_")+
}
`);

export const diceSemantics = diceGrammar
  .createSemantics()
  .addOperation("eval(overrides)", {
    ASExpr_add(num1, _, num2) {
      return num1.eval(this.args.overrides) + num2.eval(this.args.overrides);
    },
    ASExpr_sub(num1, _, num2) {
      return Math.max(
        num1.eval(this.args.overrides) - num2.eval(this.args.overrides),
        0
      );
    }, // TODO: negatives should be zeroed only at the top level?
    MDExpr_mul(num1, _, num2) {
      return num1.eval(this.args.overrides) * num2.eval(this.args.overrides);
    },
    MDExpr_div(num1, _, num2) {
      return Math.floor(
        num1.eval(this.args.overrides) / num2.eval(this.args.overrides)
      );
    },
    ExpExpr_exp(num1, _, num2) {
      return Math.pow(
        num1.eval(this.args.overrides),
        num2.eval(this.args.overrides)
      );
    },
    ParenExpr_parens(_, num, __) {
      return num.eval(this.args.overrides);
    },

    Roll(num1, _, num2) {
      const dCount = Math.max(num1.eval(this.args.overrides), 0);
      const dSize = Math.max(num2.eval(this.args.overrides), 0);

      if (dSize === 0) {
        return 0;
      }

      return sum(range(0, dCount).map(() => randomInteger(1, dSize)));
    },

    Number(sign, digits, _, label) {
      const labelName = label.child(0)?.sourceString;
      if (labelName?.length > 0 && labelName in this.args.overrides) {
        return this.args.overrides[labelName];
      }
      return parseInt(sign.sourceString + digits.sourceString);
    },
  })
  .addOperation("toDescription()", {
    ASExpr_add(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges([" + "], num2.toDescription())
      );
    },
    ASExpr_sub(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges([" - "], num2.toDescription())
      );
    },
    MDExpr_mul(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges([" * "], num2.toDescription())
      );
    },
    MDExpr_div(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges([" / "], num2.toDescription())
      );
    },
    ExpExpr_exp(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges([" ^ "], num2.toDescription())
      );
    },
    ParenExpr_parens(_, num, __) {
      return combineRanges(["("], combineRanges(num.toDescription(), [")"]));
    },
    Roll(num1, _, num2) {
      return combineRanges(
        num1.toDescription(),
        combineRanges(["d"], num2.toDescription())
      );
    },
    Number(sign, digits, _, label) {
      const labelName = label.child(0)?.sourceString;
      if (labelName?.length > 0) {
        return [
          {
            type: "label" as const,
            name: labelName,
            value: parseInt(sign.sourceString + digits.sourceString),
          },
        ];
      }
      return [`${sign.sourceString}${digits.sourceString}`];
    },
  });

export type DescriptionNode =
  | string
  | { type: "label"; name: string; value: number };

const splitFirst = <T>(arr: T[]): [T, T[]] => {
  return [arr[0], arr.slice(1)];
};

const splitLast = <T>(arr: T[]): [T[], T] => {
  return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
};

export const combineRanges = (
  left: DescriptionNode[],
  right: DescriptionNode[]
) => {
  if (left.length === 0) {
    return right;
  }
  if (right.length === 0) {
    return left;
  }
  const [leftInit, leftLast] = splitLast(left);
  const [rightHead, rightTail] = splitFirst(right);

  if (typeof leftLast === "string" && typeof rightHead === "string") {
    return [...leftInit, `${leftLast}${rightHead}`, ...rightTail];
  } else {
    return [...left, ...right];
  }
};
