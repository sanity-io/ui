import {gapProps} from '../props/gap'
import {gridParentProps} from '../props/gridParent'
import {layoutProps} from '../props/layout'
import {DISPLAY_GRID} from '../types/Display'
import {type StyleProp} from '../types/StyleProp'

export const gridProps: Record<string, StyleProp> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_GRID,
  },
  ...gridParentProps,
  ...gapProps,
  ...layoutProps,
}
