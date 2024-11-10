import { useState } from "react";

import classNames from "classnames";

import { DescriptionNode, diceGrammar, diceSemantics } from "../dicelang";

import * as styles from "./DiceLangEditor.module.css";

export const DiceLangEditor = () => {
  const [diceProgSrc, setDiceProgSrc] = useState("1:num d20:die+5:mod");
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
      <div className={styles.description}>
        {diceProgDescription ? (
          diceProgDescription.map((desc, i) => (
            <DiceProgDescription
              key={i}
              desc={desc}
              overrides={overrides}
              onOverrideChange={(name, value) => {
                console.log(name, value);
                setOverrides({
                  ...overrides,
                  [name]: value,
                });
              }}
            />
          ))
        ) : (
          <span>{diceProgResult.message}</span>
        )}
      </div>
    </div>
  );
};

const DiceProgDescription = ({
  desc,
  overrides,
  onOverrideChange,
}: {
  desc: DescriptionNode;
  overrides: { [key: string]: number };
  onOverrideChange: (name: string, value: number) => void;
}) => {
  if (typeof desc === "string") {
    return <DescriptionText desc={desc} />;
  } else {
    return (
      <DescriptionOverride
        desc={desc}
        overrides={overrides}
        onOverrideChange={onOverrideChange}
      />
    );
  }
};

const DescriptionText = ({ desc }: { desc: string }) => {
  return <span>{desc}</span>;
};

const DRAG_SCALE = 40;

const DescriptionOverride = ({
  desc,
  overrides,
  onOverrideChange,
}: {
  desc: { name: string; value: number };
  overrides: { [key: string]: number };
  onOverrideChange: (name: string, value: number) => void;
}) => {
  const [dragging, setDragging] = useState(false);

  return (
    <span
      className={classNames({
        [styles.overrideControl]: true,
        [styles.dragging]: dragging,
      })}
      onMouseDown={async (event) => {
        await document.body.requestPointerLock();

        setDragging(true);
        document.body.classList.add(styles.overrideDragging);

        // const dragStartX = event.clientX;
        const dragStartValue = overrides[desc.name] || desc.value;
        let currentDragDistance = 0;

        const handleMouseMove = (event: MouseEvent) => {
          currentDragDistance += event.movementX;
          onOverrideChange(
            desc.name,
            Math.max(
              dragStartValue + Math.floor(currentDragDistance / DRAG_SCALE),
              0
            )
          );
          //   const diff = event.clientX - dragStartX;
          //   onOverrideChange(
          //     desc.name,
          //     dragStartValue + Math.floor(diff / DRAG_SCALE)
          //   );
        };

        document.addEventListener("mousemove", handleMouseMove);

        document.addEventListener(
          "mouseup",
          () => {
            setDragging(false);
            document.body.classList.remove(styles.overrideDragging);
            document.removeEventListener("mousemove", handleMouseMove);
            document.exitPointerLock();
          },
          {
            once: true,
          }
        );
      }}
    >
      <span className={styles.overrideValue}>
        {overrides[desc.name] !== undefined ? overrides[desc.name] : desc.value}
      </span>
      <span className={styles.overrideLabel}>{desc.name}</span>
    </span>
  );
};
