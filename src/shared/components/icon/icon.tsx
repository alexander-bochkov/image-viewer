import type { FC, SVGProps } from "react";

const modules = import.meta.glob<FC<SVGProps<SVGSVGElement>>>(
  "/src/assets/icons/*.svg",
  {
    eager: true,
    import: "default",
    query: "?react",
  },
);

const icons = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [
    path.split("/").pop()?.replace(".svg", "") ?? "",
    module,
  ]),
);

type IconProps = SVGProps<SVGSVGElement> & {
  name: "rotate-left" | "rotate-right" | "spinner" | "xmark";
};

export const Icon = ({ name, ...props }: IconProps) => {
  const SVG = icons[name];

  if (!SVG) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <SVG {...props} />;
};
