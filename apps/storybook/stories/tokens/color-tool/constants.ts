import {hues} from '@sanity/color'

export const SLIDER_H = 360

/** Gap between the slider columns, in px (shared with the connector geometry) */
export const SLIDER_GAP = 4

/** Colors used for the H/S/L slider handles and their connector lines */
export const CHANNEL_COLORS = {
  h: hues.red['500'].hex,
  s: hues.green['500'].hex,
  l: hues.blue['500'].hex,
}
