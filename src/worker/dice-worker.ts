import { diceGrammar, diceSemantics } from "../dicelang";

export const calculateDistribtion = async (
  diceProg: string,
  overrides: { [label: string]: number },
  trials = 10_000
) => {
  const match = diceGrammar.match(diceProg);
  if (!match.succeeded()) {
    throw new Error(match.message);
  }
  let results: { [result: number]: number } = {};
  for (let i = 0; i < trials; i++) {
    const result = diceSemantics(match).eval(overrides);
    results[result] = (results[result] || 0) + 1;
  }
  return Object.entries(results)
    .map(([result, count]) => [Number(result), count] as const)
    .sort(([a, _], [b, __]) => a - b);
};
