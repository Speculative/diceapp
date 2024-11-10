import { useEffect, useState } from "react";

const worker = new ComlinkWorker<typeof import("../worker/dice-worker")>(
  new URL("../worker/dice-worker", import.meta.url)
);

export const DiceViz = ({
  progSrc,
  overrides,
}: {
  progSrc: string;
  overrides: { [label: string]: number };
}) => {
  const [distribution, setDistribution] = useState<
    (readonly [number, number])[]
  >([]);

  useEffect(() => {
    worker.calculateDistribtion(progSrc, overrides).then(setDistribution);
  }, [progSrc, overrides]);

  return distribution.map(([result, count]) => (
    <div key={result}>
      {result}: {count}
    </div>
  ));
};
