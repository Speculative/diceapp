import { useEffect, useMemo, useState } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { sumBy } from "remeda";

import styles from "./DiceViz.module.css";

const worker = new ComlinkWorker<typeof import("../worker/dice-worker")>(
  new URL("../worker/dice-worker", import.meta.url)
);

type TooltipPayload = {
  cdf: number;
  pdf: number;
  count: number;
  result: number;
};

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
  const enhancedDistribution = useMemo(() => {
    const total = sumBy(distribution, ([_, count]) => count);
    return distribution.reduce((acc, [result, count]) => {
      const cumulative = sumBy(acc, ({ count }) => count);
      return [
        ...acc,
        {
          cdf: (cumulative + count) / total,
          pdf: count / total,
          count,
          result,
        },
      ];
    }, [] as TooltipPayload[]);
  }, [distribution]);

  useEffect(() => {
    worker.calculateDistribtion(progSrc, overrides).then(setDistribution);
  }, [progSrc, overrides]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={enhancedDistribution}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <YAxis />
        <XAxis dataKey="result" />
        <Tooltip content={<BarTooltip />} />
        <Bar dataKey="count" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const BarTooltip = <TValue extends ValueType, TName extends NameType>({
  payload,
}: TooltipProps<TValue, TName>) => {
  if (!payload || payload.length === 0) {
    return null;
  }
  const { cdf, pdf, result } = payload[0].payload as unknown as TooltipPayload;
  return (
    <div className={styles.barTooltip}>
      <div>
        P(&le; {result}): {(cdf * 100).toFixed(2)}%
      </div>
      <div>
        P(= {result}): {(pdf * 100).toFixed(2)}%
      </div>
    </div>
  );
};
