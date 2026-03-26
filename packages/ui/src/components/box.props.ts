import { DISPLAY_BLOCK } from "../types/Display";
import { layoutProps } from '../props/layout';
import { type PropDef } from "../types/PropDef";

export const boxProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_BLOCK
  },
  ...layoutProps
}
