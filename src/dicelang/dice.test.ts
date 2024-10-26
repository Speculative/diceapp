import { expect, test } from "vitest";
import { diceGrammar } from "./dice";

test("parses a dice roll", () => {
  const match = diceGrammar.match("2d6");
  expect(match.succeeded()).toBe(true);
});
