import {style} from '@vanilla-extract/css'

import {MAXIMUM_WIDTH, MINIMUM_WIDTH} from './sidebarWidth'

const CARD_GAP = 16

/**
 * The theme cards flow into two columns once the sidebar has been dragged a
 * third of the way from its narrowest to its widest. The breakpoints are
 * container queries on the sidebar's content (`ResizableSidebar`), which is
 * as wide as the sidebar itself.
 */
const TWO_COLUMNS_FROM = MINIMUM_WIDTH + (MAXIMUM_WIDTH - MINIMUM_WIDTH) * 0.3

/** Three columns on the wider small screens the sidebar covers, where two would be huge */
const THREE_COLUMNS_FROM = 480

export const cardGrid = style({
  'display': 'grid',
  'gridTemplateColumns': '1fr',
  'gap': CARD_GAP,
  '@container': {
    [`(min-width: ${TWO_COLUMNS_FROM}px)`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [`(min-width: ${THREE_COLUMNS_FROM}px)`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
})
