import { type PropDef } from "../types/PropDef";
import { type Responsive } from "../types/Responsive";

export type FlexChildProps = {
  flexBasis?: Responsive<string>
  flexGrow?: Responsive<number>
  flexShrink?: Responsive<number>
}

export const flexChildProps: Record<string, PropDef> = {
  flexBasis: {
    type: 'string',
    className: 'flex-basis',
    variable: '--flex-basis',
  },
  flexGrow: {
    type: 'number',
    className: 'flex-grow',
    variable: '--flex-grow',
  },
  flexShrink: {
    type: 'number',
    className: 'flex-shrink',
    variable: '--flex-shrink',
  },
}
