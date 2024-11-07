import { useState } from "react";

import { DescriptionNode, diceGrammar, diceSemantics } from "../dicelang";

export const DiceLangEditor = () => {
  const [diceProgSrc, setDiceProgSrc] = useState("");
  const [overrides, setOverrides] = useState<{ [key: string]: number }>({});

  const diceProgResult = diceGrammar.match(diceProgSrc);
  const diceProgDescription: DescriptionNode[] | null =
    diceProgResult.succeeded()
      ? diceSemantics(diceProgResult).toDescription()
      : null;

  return (
    <div>
      <textarea
        value={diceProgSrc}
        onChange={(e) => setDiceProgSrc(e.target.value)}
        style={{ width: "100%", height: "100%" }}
      />
      {diceProgDescription ? (
        diceProgDescription.map((desc, i) => (
          <DiceProgDescription key={i} desc={desc} />
        ))
      ) : (
        <span>{diceProgResult.message}</span>
      )}
    </div>
  );
};

const DiceProgDescription = ({ desc }: { desc: DescriptionNode }) => {
  if (typeof desc === "string") {
    return <span>{desc}</span>;
  } else {
    return (
      <span>
        [{desc.name}~{desc.value}]
      </span>
    );
  }
};
