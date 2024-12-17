declare module "lucide-react" {
  import { FC, SVGProps } from "react";

  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export type Icon = FC<IconProps>;

  export const MessageCircle: Icon;
  export const Heart: Icon;
  export const Home: Icon;
  export const User: Icon;
  // 必要なアイコンを追加
}
