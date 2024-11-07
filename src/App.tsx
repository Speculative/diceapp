import { useState } from "react";

import { DiceLangEditor } from "./diceapp/DiceLangEditor";

import styles from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DiceLangEditor />
    </>
  );
}

export default App;
