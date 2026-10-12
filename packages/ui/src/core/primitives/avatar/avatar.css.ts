import {globalStyle, style} from '@vanilla-extract/css'

export const avatarRoot = style({
  width: 'var(--avatar-size)',
  height: 'var(--avatar-size)',
  borderRadius: 'calc(var(--avatar-size) / 2)',
  backgroundColor: 'var(--avatar-bg-color)',
  position: 'relative',
  boxSizing: 'border-box',
  userSelect: 'none',
  boxShadow: '0 0 0 1px var(--card-bg-color)',
  selectors: {
    '&[data-status="inactive"]': {
      opacity: 0.5,
    },
    '&[data-as="button"]': {
      WebkitFontSmoothing: 'inherit',
      appearance: 'none',
      margin: 0,
      padding: 0,
      border: 0,
      font: 'inherit',
      color: 'inherit',
      outline: 'none',
    },
  },
})

export const avatarArrow = style({
  position: 'absolute',
  boxSizing: 'border-box',
  zIndex: 0,
  opacity: 0,
  transition: 'all 0.2s linear',
  transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  selectors: {
    "[data-arrow-position='inside'] > &": {
      transform: 'rotate(-90deg) translate3d(0, 6px, 0)',
      opacity: 0,
    },
    "[data-arrow-position='top'] > &": {
      opacity: 1,
      transform: 'rotate(0deg)',
    },
    "[data-arrow-position='bottom'] > &": {
      opacity: 1,
      transform: 'rotate(-180deg)',
    },
  },
})

globalStyle(`${avatarArrow} > svg`, {
  width: '11px',
  height: '7px',
  position: 'absolute',
  top: '-5px',
  left: '50%',
  transform: 'translateX(-6px)',
})

globalStyle(`${avatarArrow} > svg:not([hidden])`, {
  display: 'block',
})

export const avatarImage = style({
  // Positioned so it paints over the absolutely positioned arrow
  position: 'relative',
  width: 'var(--avatar-size)',
  height: 'var(--avatar-size)',
  borderRadius: '50%',
  // The `xMidYMid meet` fit of the svg <image> this replaces
  objectFit: 'contain',
  selectors: {
    '&:not([hidden])': {
      display: 'block',
    },
  },
})

export const avatarStrokes = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 'var(--avatar-size)',
  height: 'var(--avatar-size)',
  // With the UA `overflow: hidden` of a nested svg this clips the strokes to
  // the circle, so only the inner half of each stroke stays visible
  borderRadius: '50%',
  pointerEvents: 'none',
})

export const avatarBgStroke = style({
  strokeWidth: '4px',
  stroke: 'var(--card-bg-color)',
})

export const avatarStroke = style({
  strokeWidth: '2px',
  stroke: 'var(--avatar-bg-color)',
  selectors: {
    '[data-status="editing"] &': {
      strokeDasharray: '2 4',
      strokeLinecap: 'round',
    },
  },
})

export const avatarStack = style({
  whiteSpace: 'nowrap',
})

globalStyle(`${avatarStack} > div`, {
  verticalAlign: 'top',
})

globalStyle(`${avatarStack} > div:not([hidden])`, {
  display: 'inline-block',
})

export const avatarCounter = style({
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  userSelect: 'none',
  color: 'var(--card-fg-color)',
  background: 'var(--card-bg-color)',
  boxShadow: '0 0 0 1px var(--card-bg-color), inset 0 0 0 1px var(--card-hairline-hard-color)',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})

export const avatarInitials = style({
  width: '100%',
  height: '100%',
  color: 'var(--avatar-fg-color)',
  alignItems: 'center',
  justifyContent: 'center',
  textTransform: 'uppercase',
  textAlign: 'center',
  borderRadius: '50%',
  selectors: {
    '&:not([hidden])': {
      display: 'flex',
    },
  },
})
