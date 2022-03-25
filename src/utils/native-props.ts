import {CSSProperties} from "react";

export interface NativeProps<S extends string>{
  className?: string,
  style?: CSSProperties & Partial<Record<S, any>>
}
