import {createVar, style} from '@vanilla-extract/css'

const TILE_SIZE = 24
const TILE_GAP = 4

/** The image spans both rows of tiles */
const IMAGE_SIZE = TILE_SIZE * 2 + TILE_GAP

/** The variant previews are the theme thumbnails, laid out at this width and scaled down */
export const VARIANT_WIDTH = 144

export const VARIANT_GAP = 8
export const ROW_PADDING = 12

/** The frame around a variant's thumbnail, on either side */
export const VARIANT_FRAME = 4

/** The width of one variant's thumbnail, set on the row once it is measured */
export const variantWidth = createVar()

/** How much a variant's thumbnail is scaled down from `VARIANT_WIDTH` */
export const variantScale = createVar()

export const paletteGrid = style({
  display: 'grid',
  gridTemplateColumns: `repeat(3, ${TILE_SIZE}px)`,
  gridAutoRows: TILE_SIZE,
  gap: TILE_GAP,
  selectors: {
    "&[data-with-image='true']": {
      gridTemplateColumns: `${IMAGE_SIZE}px repeat(3, ${TILE_SIZE}px)`,
    },
  },
})

export const imageTile = style({
  display: 'block',
  gridRow: 'span 2',
  width: IMAGE_SIZE,
  height: IMAGE_SIZE,
  borderRadius: 3,
  objectFit: 'cover',
  boxShadow: 'inset 0 0 0 1px var(--card-border-color)',
})

export const tile = style({
  display: 'block',
  borderRadius: 3,
  boxShadow: 'inset 0 0 0 1px var(--card-border-color)',
  selectors: {
    "&[data-empty='true']": {
      background:
        'repeating-linear-gradient(-45deg, transparent 0 3px, var(--card-border-color) 3px 4px)',
    },
  },
})

/**
 * The variants scroll sideways and snap into place, bleeding into the card's
 * padding so the row runs from edge to edge
 */
export const variantRow = style({
  display: 'flex',
  gap: VARIANT_GAP,
  margin: `0 -${ROW_PADDING}px`,
  padding: `0 ${ROW_PADDING}px`,
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollPaddingLeft: ROW_PADDING,
  scrollbarWidth: 'thin',
})

export const variantButton = style({
  'appearance': 'none',
  'flex': 'none',
  'display': 'block',
  'boxSizing': 'border-box',
  'width': `calc(${variantWidth} + ${VARIANT_FRAME * 2}px)`,
  'margin': 0,
  'padding': 0,
  'border': 0,
  'background': 'none',
  'color': 'inherit',
  'font': 'inherit',
  'textAlign': 'center',
  'cursor': 'pointer',
  'scrollSnapAlign': 'start',
  ':focus': {
    outline: 'none',
  },
})

/**
 * Clips the scaled-down thumbnail to its visual size, with room for the ring
 * — drawn inside the frame, like the theme cards', so the scrolling row
 * never clips it
 */
export const variantFrame = style({
  display: 'block',
  boxSizing: 'border-box',
  width: `calc(${variantWidth} + ${VARIANT_FRAME * 2}px)`,
  height: `calc(${variantWidth} * 9 / 16 + ${VARIANT_FRAME * 2}px)`,
  padding: VARIANT_FRAME,
  borderRadius: 7,
  overflow: 'hidden',
  transition: 'box-shadow 100ms',
  selectors: {
    [`${variantButton}:hover &`]: {
      boxShadow: 'inset 0 0 0 2px var(--card-border-color)',
    },
    [`${variantButton}[aria-pressed='true'] &`]: {
      boxShadow: 'inset 0 0 0 2px var(--card-focus-ring-color)',
    },
    [`${variantButton}:focus-visible &`]: {
      outline: '2px solid var(--card-focus-ring-color)',
      outlineOffset: -2,
    },
  },
})

export const variantScaleBox = style({
  display: 'block',
  width: VARIANT_WIDTH,
  transform: `scale(${variantScale})`,
  transformOrigin: 'top left',
})
