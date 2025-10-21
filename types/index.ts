import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type SvgIcon = {
  width?: number;
  height?: number;
  className?: string;
};
