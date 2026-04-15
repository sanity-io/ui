import {layoutProps} from '../props/layout'
import {DISPLAY_BLOCK} from '../types/Display'
import {type StyleProp} from '../types/StyleProp'

export const boxProps: Record<string, StyleProp> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_BLOCK,
  },
  ...layoutProps,
}
