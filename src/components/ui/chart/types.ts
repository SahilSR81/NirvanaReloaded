import { ReactNode } from "react";

export type ChartConfig = {
  [k in string]: {
    label?: ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartContextProps = {
  config: ChartConfig
}