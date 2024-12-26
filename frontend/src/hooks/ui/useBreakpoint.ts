import { useState, useEffect } from "react";
import {
  Breakpoint,
  BreakpointConfig,
  UseBreakpointReturn,
} from "@/@types/breakpoint"; 

const breakpoints: BreakpointConfig = {
  sm: 640, // モバイル
  md: 768, // タブレット
  lg: 1024, // 小型デスクトップ
  xl: 1280, // 標準デスクトップ
  "2xl": 1536, // 大型ディスプレイ
} as const;

export const useBreakpoint = (): UseBreakpointReturn => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("lg");
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // パフォーマンス最適化のためにデバウンスを追加
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setWidth(width);

        if (width < breakpoints.sm) setBreakpoint("sm");
        else if (width < breakpoints.md) setBreakpoint("md");
        else if (width < breakpoints.lg) setBreakpoint("lg");
        else if (width < breakpoints.xl) setBreakpoint("xl");
        else setBreakpoint("2xl");
      }, 100);
    };

    // 初期値の設定
    handleResize();

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    breakpoint,
    width,
    isSmall: breakpoint === "sm",
    isMedium: breakpoint === "md",
    isLarge: breakpoint === "lg",
    isExtraLarge: breakpoint === "xl",
    is2XLarge: breakpoint === "2xl",
  };
};
