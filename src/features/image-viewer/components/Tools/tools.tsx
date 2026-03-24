import { Button, Icon } from "shared/components";

import styles from "./tools.module.css";

type ToolsProps = {
  className?: string;
  rotate: (direction: "left" | "right") => void;
};

export const Tools = ({ rotate }: ToolsProps) => (
  <div className={styles.tools}>
    <Button
      onClick={() => rotate("left")}
      shape="square"
      size="medium"
      variant="default"
    >
      <Icon name="rotate-left" />
    </Button>
    <Button
      onClick={() => rotate("right")}
      shape="square"
      size="medium"
      variant="default"
    >
      <Icon name="rotate-right" />
    </Button>
  </div>
);
