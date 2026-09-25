import {style} from '@vanilla-extract/css'

import {MAXIMUM_WIDTH, MINIMUM_WIDTH} from './sidebarWidth'

import {sidebarContent} from './ResizableSidebar.css'

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

/**
 * The columns share the width equally whatever the titles: a plain `1fr` may
 * not shrink below a card's min-content width, and a card's title does not
 * wrap, so one long title would widen its column past the sidebar
 */
const COLUMN = 'minmax(0, 1fr)'

export const cardGrid = style({
  'display': 'grid',
  'gridTemplateColumns': COLUMN,
  'gap': CARD_GAP,
  '@container': {
    [`${sidebarContent} (min-width: ${TWO_COLUMNS_FROM}px)`]: {
      gridTemplateColumns: `repeat(2, ${COLUMN})`,
    },
    [`${sidebarContent} (min-width: ${THREE_COLUMNS_FROM}px)`]: {
      gridTemplateColumns: `repeat(3, ${COLUMN})`,
    },
  },
})
