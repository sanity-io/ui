import {typographyProps} from '../props/typography'
import {type PropDef} from '../types/PropDef'
import {TEXT_SIZE} from '../types/Text'

export const textProps: Record<string, PropDef> = {
  as: {
    type: 'string',
  },
  size: {
    type: 'union',
    className: 'text-body',
    values: TEXT_SIZE,
  },
  ...typographyProps,
}
