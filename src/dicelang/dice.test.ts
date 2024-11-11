import { fc, test as fctest } from "@fast-check/vitest";
import { describe, expect, test } from "vitest";

import { combineRanges, diceGrammar, diceSemantics } from "./dice";

const MAX_DICE_COUNT = 1000;

const assertEvalRange = (
  expr: string,
  min: number,
  max: number,
  overrides = {}
) => {
  const match = diceGrammar.match(expr);
  expect(match.succeeded()).toBeTruthy();
  const result = diceSemantics(match).eval(overrides);
  expect(result).toBeGreaterThanOrEqual(min);
  expect(result).toBeLessThanOrEqual(max);
};

const assertEvalEqual = (expr: string, expected: number, overrides = {}) => {
  const match = diceGrammar.match(expr);
  expect(match.succeeded()).toBeTruthy();
  const result = diceSemantics(match).eval(overrides);
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
    ["(2 + 1) * (3 + 1)", 12],
  ] as const;

  for (const [input, expected] of MATH_TESTS) {
    test(input, () => {
      assertEvalEqual(input, expected);
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

describe("overridden dice semantics", () => {
  fctest.prop([fc.nat(), fc.stringMatching(/^[a-zA-Z_]+$/), fc.nat()])(
    "should override number",
    (X, label, O) => {
      assertEvalEqual(`${X}:${label}`, O, { [label]: O });
    }
  );

  fctest.prop([
    fc.nat(),
    fc.stringMatching(/^[a-zA-Z_]+$/),
    fc.nat(),
    fc.nat(),
  ])("should override in expression X:label + Y", (X, label, O, Y) => {
    assertEvalEqual(`${X}:${label} + ${Y}`, O + Y, { [label]: O });
  });

  fctest.prop([
    fc.nat(),
    fc.stringMatching(/^[a-zA-Z_]+$/),
    fc.nat(),
    fc.nat(),
  ])("should override in expression Y + X:label", (X, label, O, Y) => {
    assertEvalEqual(`${Y} + ${X}:${label}`, Y + O, { [label]: O });
  });
});

describe("combineRanges", () => {
  test("combines two strings", () => {
    const result = combineRanges(["a"], ["b"]);
    expect(result).toEqual(["ab"]);
  });

  test("ignores second argument empty", () => {
    const result = combineRanges(["a"], []);
    expect(result).toEqual(["a"]);
  });

  test("ignores first argument empty", () => {
    const result = combineRanges([], ["b"]);
    expect(result).toEqual(["b"]);
  });

  test("does not combine left label with right string", () => {
    const result = combineRanges(
      ["a", { type: "label", name: "b", value: 1 }],
      ["c"]
    );
    expect(result).toEqual(["a", { type: "label", name: "b", value: 1 }, "c"]);
  });

  test("does not combine right label with left string", () => {
    const result = combineRanges(
      ["a"],
      [{ type: "label", name: "b", value: 1 }, "c"]
    );
    expect(result).toEqual(["a", { type: "label", name: "b", value: 1 }, "c"]);
  });

  test("does not combine left label with right label", () => {
    const result = combineRanges(
      [{ type: "label", name: "a", value: 1 }],
      [{ type: "label", name: "b", value: 1 }]
    );
    expect(result).toEqual([
      { type: "label", name: "a", value: 1 },
      { type: "label", name: "b", value: 1 },
    ]);
  });
});
