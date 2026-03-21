import clsx from "clsx/lite";

import type { ButtonHTMLAttributes } from "react";

import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape: "round" | "square";
  size: "small" | "medium";
  variant: "default" | "accent";
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
