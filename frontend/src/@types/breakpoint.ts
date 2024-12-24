export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

export interface UseBreakpointReturn {
  breakpoint: Breakpoint;
  width: number;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isExtraLarge: boolean;
  is2XLarge: boolean;
}