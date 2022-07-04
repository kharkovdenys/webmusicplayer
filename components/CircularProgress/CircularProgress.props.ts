import { DetailedHTMLProps, SVGAttributes } from "react";

export interface CircularProgressProps extends DetailedHTMLProps<SVGAttributes<SVGElement>, SVGElement> {
    variant?: "for-list";
}