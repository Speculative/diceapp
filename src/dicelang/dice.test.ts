import { expect, test, describe, assert } from "vitest";
import { diceGrammar, diceSemantics } from "./dice";
import { test as fctest, fc } from "@fast-check/vitest";

const MAX_DICE_COUNT = 1000;

const assertEvalRange = (expr: string, min: number, max: number) => {
  const match = diceGrammar.match(expr);
  expect(match.succeeded()).toBeTruthy();
  const result = diceSemantics(match).eval();
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
};

const assertEvalEqual = (expr: string, expected: number) => {
  const match = diceGrammar.match(expr);
  expect(match.succeeded()).toBeTruthy();
  const result = diceSemantics(match).eval();
  expect(result).toBe(expected);
};

describe("basic math", () => {
  const MATH_TESTS = [
    ["1 + 2", 3],
    ["1 - 2", 0],
    ["1 * 3", 3],
    ["4 - 1 * 2", 2],
    ["2 * (1 + 3)", 8],
    ["(1 + 3) * 2", 8],
    ["3 / 2", 1],
    ["3 / 2 + 1", 2],
    ["1 / 2", 0],
    ["2 ^ 2", 4],
    ["2 ^ 2 + 1", 5],
    ["2 ^ (2 + 1)", 8],
    ["(2 + 1) ^ 2", 9],
  ] as const;

  for (const [input, expected] of MATH_TESTS) {
    test(input, () => {
      const match = diceGrammar.match(input);
      expect(match.succeeded()).toBeTruthy();
      const result = diceSemantics(match).eval();
      expect(result).toBe(expected);
    });
  }
});

describe("dice semantics", () => {
  const ROLL_TESTS = [
    ["1d6", 1, 6],
    ["1d20 + 5", 6, 25],
    ["1d(15 + 5)", 1, 20],
    ["(1+1)d20", 2, 40],
    ["(1+1)d(15+5) + 5", 7, 45],
  ] as const;

  for (const [input, min, max] of ROLL_TESTS) {
    test(input, () => {
      for (let i = 0; i < 100; i++) {
        assertEvalRange(input, min, max);
      }
    });
  }

  fctest.prop([
    fc.integer({ min: 1, max: MAX_DICE_COUNT }),
    fc.integer({ min: 1 }),
  ])("XdY should return a number between Y and X * Y", (dCount, dSize) =>
    assertEvalRange(`${dCount}d${dSize}`, dCount, dCount * dSize)
  );

  fctest.prop([fc.nat(MAX_DICE_COUNT)])("Xd0 should return 0", (dCount) =>
    assertEvalEqual(`${dCount}d0`, 0)
  );

  fctest.prop([fc.nat()])("0dY should return 0", (dSize) =>
    assertEvalEqual(`0d${dSize}`, 0)
  );

  fctest.prop([fc.integer({ max: -1 }), fc.integer({ min: 1 })])(
    "XdY should return 0 when X is negative",
    (dCount, dSize) => assertEvalEqual(`${dCount}d${dSize}`, 0)
  );

  fctest.prop([fc.integer({ max: -1 }), fc.integer({ min: 1 })])(
    "XdY should return 0 when Y is negative",
    (dCount, dSize) => assertEvalEqual(`${dCount}d${dSize}`, 0)
  );

  fctest.prop([
    fc.integer({ min: 1, max: MAX_DICE_COUNT }),
    fc.integer({ min: 1 }),
    fc.nat(),
  ])("XdY + Z", (dCount, dSize, mod) =>
    assertEvalRange(
      `${dCount}d${dSize} + ${mod}`,
      dCount + mod,
      dCount * dSize + mod
    )
  );

  fctest.prop([
    fc.integer({ min: 1, max: MAX_DICE_COUNT }),
    fc.integer({ min: 1 }),
    fc.nat(),
  ])("XdY - Z", (dCount, dSize, mod) =>
    assertEvalRange(
      `${dCount}d${dSize} - ${mod}`,
      Math.max(dCount - mod, 0),
      Math.max(dCount * dSize - mod, 0)
    )
  );

  fctest.prop([fc.nat(10), fc.nat(10), fc.integer({ min: 1 })])(
    "(X + Y)dZ",
    (dCount1, dCount2, dSize) =>
      assertEvalRange(
        `(${dCount1} + ${dCount2})d${dSize}`,
        dCount1 + dCount2,
        (dCount1 + dCount2) * dSize
      )
  );

  fctest.prop([fc.nat(10), fc.nat(10), fc.integer({ min: 1 })])(
    "Xd(Y+Z)",
    (dCount, dSize1, dSize2) =>
      assertEvalRange(
        `${dCount}d(${dSize1} + ${dSize2})`,
        dCount,
        dCount * (dSize1 + dSize2)
      )
  );
});
