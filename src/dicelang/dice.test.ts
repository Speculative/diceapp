import { expect, test, describe } from "vitest";
import { diceGrammar, diceSemantics } from "./dice";
import { test as fctest, fc } from "@fast-check/vitest";

test("parses a dice roll", () => {
  const match = diceGrammar.match("2d6");
  expect(match.succeeded()).toBe(true);
});

const MAX_DICE_COUNT = 1000;

describe("dice semantics", () => {
  fctest.prop([
    fc.integer({ min: 1, max: MAX_DICE_COUNT }),
    fc.integer({ min: 1 }),
  ])("XdY should return a number between Y and X * Y", (dCount, dSize) => {
    const match = diceGrammar.match(`${dCount}d${dSize}`);
    const result = diceSemantics(match).eval();
    return result >= dCount && result <= dCount * dSize;
  });

  fctest.prop([fc.nat(MAX_DICE_COUNT)])("Xd0 should return 0", (dCount) => {
    const match = diceGrammar.match(`${dCount}d0`);
    const result = diceSemantics(match).eval();
    return result === 0;
  });

  fctest.prop([fc.nat()])("0dY should return 0", (dSize) => {
    const match = diceGrammar.match(`0d${dSize}`);
    const result = diceSemantics(match).eval();
    return result === 0;
  });

  fctest.prop([fc.integer({ max: -1 }), fc.integer({ min: 1 })])(
    "XdY should return 0 when X is negative",
    (dCount, dSize) => {
      const match = diceGrammar.match(`${dCount}d${dSize}`);
      const result = diceSemantics(match).eval();
      return result === 0;
    }
  );

  fctest.prop([fc.integer({ max: -1 }), fc.integer({ min: 1 })])(
    "XdY should return 0 when Y is negative",
    (dCount, dSize) => {
      const match = diceGrammar.match(`${dCount}d${dSize}`);
      const result = diceSemantics(match).eval();
      return result === 0;
    }
  );
});
