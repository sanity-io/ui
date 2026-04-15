import {vars} from '@sanity/ui'
import {globalStyle, style} from '@vanilla-extract/css'

export const propertyBox = style({
  overflow: 'auto',
})

globalStyle(`${propertyBox} + ${propertyBox}`, {
  borderTop: `${vars.border[2]} solid ${vars.color.muted.border}`,
})
