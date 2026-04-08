import {flexParentProps} from '../props/flexParent'
import {gapProps} from '../props/gap'
import {layoutProps} from '../props/layout'
import {DISPLAY_FLEX} from '../types/Display'
import {type PropDef} from '../types/PropDef'

export const flexProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  display: {
    type: 'union',
    className: 'display',
    values: DISPLAY_FLEX,
  },
  ...flexParentProps,
  ...gapProps,
  ...layoutProps,
}
