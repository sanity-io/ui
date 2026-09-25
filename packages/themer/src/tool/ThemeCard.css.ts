import {style} from '@vanilla-extract/css'

export const root = style({
  position: 'relative',
})

/** A bare button, so that the thumbnail and the title can carry the styling */
export const pickButton = style({
  'appearance': 'none',
  'display': 'block',
  'boxSizing': 'border-box',
  'width': '100%',
  'margin': 0,
  'padding': 0,
  'border': 0,
  'background': 'none',
  'color': 'inherit',
  'font': 'inherit',
  'textAlign': 'center',
  'cursor': 'pointer',
  ':focus': {
    outline: 'none',
  },
})

/**
 * Wraps the thumbnail with room for the ring that marks the applied theme —
 * hovering shows a faint ring, the applied theme the focus ring color, and
 * keyboard focus an outline. The rings are drawn inside the frame's padding,
 * so nothing sticks out to be clipped by the scrolling list.
 */
export const frame = style({
  display: 'block',
  padding: 4,
  borderRadius: 10,
  transition: 'box-shadow 100ms',
  selectors: {
    [`${pickButton}:hover &`]: {
      boxShadow: 'inset 0 0 0 2px var(--card-border-color)',
    },
    [`${pickButton}[aria-pressed='true'] &`]: {
      boxShadow: 'inset 0 0 0 2px var(--card-focus-ring-color)',
    },
    [`${pickButton}:focus-visible &`]: {
      outline: '2px solid var(--card-focus-ring-color)',
      outlineOffset: -2,
    },
  },
})

/**
 * The actions menu sits on the thumbnail's top right corner, like the actions
 * of an image input, and only shows on hover, on keyboard focus, and while it
 * is open — its popover is portaled, so an open menu does not count as focus
 * within
 */
export const menuSlot = style({
  position: 'absolute',
  top: 10,
  right: 10,
  opacity: 0,
  transition: 'opacity 100ms',
  selectors: {
    [`${root}:hover &, ${root}:focus-within &, &[data-visible='true']`]: {
      opacity: 1,
    },
  },
})

/** The dark card behind the menu button sizes to the button, not the slot */
export const menuCard = style({
  display: 'inline-block',
})
