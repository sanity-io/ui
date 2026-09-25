import {style} from '@vanilla-extract/css'

/**
 * The view transition group of the sidebar, which the split preview's
 * transition (see `ThemerLayout.css.ts`) leaves alone: it never animates, and
 * the Studio copies animating underneath never paint over it
 */
export const SIDEBAR_TRANSITION_NAME = 'themer-sidebar'

export const sidebar = style({
  flex: 'none',
  viewTransitionName: SIDEBAR_TRANSITION_NAME,
  selectors: {
    // On small screens the sidebar covers the Studio instead of standing next to it
    "&[data-overlay='true']": {
      position: 'absolute',
      inset: 0,
      width: 'auto',
    },
  },
})

/**
 * Draws the sidebar's border and gives the resize handle its card colors. It
 * does not clip, so the handle can straddle the border — the content is
 * clipped one level down instead.
 */
export const frame = style({
  position: 'relative',
})

/**
 * Clips the content, and is the container its layout queries: as wide as
 * the sidebar, whether or not a scrollbar takes room inside — see the theme
 * grid's columns in `ThemeList.css.ts`
 */
export const content = style({
  containerType: 'inline-size',
})

/**
 * The grab area along the sidebar's left edge. It straddles the border so it
 * is easy to hit, and highlights while hovered, focused or dragged.
 */
export const resizeHandle = style({
  'position': 'absolute',
  'top': 0,
  'bottom': 0,
  'left': -3,
  'zIndex': 1,
  'width': 7,
  'cursor': 'col-resize',
  'touchAction': 'none',
  '::after': {
    content: '',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 2,
    width: 3,
    background: 'var(--card-focus-ring-color)',
    opacity: 0,
    transition: 'opacity 100ms',
  },
  ':focus': {
    outline: 'none',
  },
  'selectors': {
    "&:hover::after, &:focus-visible::after, &[data-dragging='true']::after": {
      opacity: 1,
    },
  },
})
