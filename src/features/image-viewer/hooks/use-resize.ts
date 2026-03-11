import { useEffect } from "react";
import { DEFAULT_OFFSET } from "../constants";

import type { Dispatch, SetStateAction } from "react";
import type { Offset, Scale } from "../types";

export const useResize = ({
  setOffset,
  setScale,
}: {
  setOffset: Dispatch<SetStateAction<Offset>>;
  setScale: Dispatch<SetStateAction<Scale>>;
}) => {
  useEffect(() => {
    const handleResize = () => {
      setOffset(DEFAULT_OFFSET);
      setScale("fit");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setOffset, setScale]);
};
