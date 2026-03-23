import clsx from "clsx/lite";

import type { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape: "round" | "square";
  size: "small" | "medium";
  variant: "default" | "accent";
  /**
   * Currently command and commandFor attributes are not supported by @types/react:
   * Issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/74664
   * PR: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/74680
   */
  command?: string;
  commandFor?: string;
};

export const Button = ({
  className,
  shape,
  size,
  variant,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={clsx(
      styles.button,
      styles[shape],
      styles[size],
      styles[variant],
      className,
    )}
  />
);
