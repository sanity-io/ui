import {style} from '@vanilla-extract/css'

/**
 * The theme cards flow into as many columns as fit: one at the default
 * sidebar width, two once it is widened or covers a small screen
 */
export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 16,
})
