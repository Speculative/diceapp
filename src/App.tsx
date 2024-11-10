import { useMemo, useState } from "react";

import { DiceLangEditor } from "./diceapp/DiceLangEditor";
import { DiceViz } from "./diceviz/DiceViz";

function App() {
  const [diceProgSrc, setDiceProgSrc] = useState("2:num d20:die+5:mod");
  const [overrides, setOverrides] = useState<{ [label: string]: number }>({});

  return (
    <>
      <DiceLangEditor
        progSrc={diceProgSrc}
        overrides={overrides}
        onUpdateProgram={(prog, overrides) => {
          console.log(prog, overrides);
          setDiceProgSrc(prog);
          setOverrides(overrides);
        }}
      />
      <DiceViz progSrc={diceProgSrc} overrides={overrides} />
    </>
  );
}

export default App;
