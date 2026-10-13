import {css} from '#styled-system/css'

export const avatarRoot = css({
  'width': 'var(--avatar-size)',
  'height': 'var(--avatar-size)',
  'borderRadius': 'calc(var(--avatar-size) / 2)',
  'backgroundColor': 'var(--avatar-bg-color)',
  'position': 'relative',
  'boxSizing': 'border-box',
  'userSelect': 'none',
  'boxShadow': '0 0 0 1px var(--card-bg-color)',
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
})

export const avatarArrow = css({
  'position': 'absolute',
  'boxSizing': 'border-box',
  'zIndex': 0,
  'opacity': 0,
  'transition': 'all 0.2s linear',
  'transform': 'rotate(-90deg) translate3d(0, 6px, 0)',
  'left': 0,
  'right': 0,
  'top': 0,
  'bottom': 0,
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
  '& > svg': {
    width: '11px',
    height: '7px',
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateX(-6px)',
  },
  '& > svg:not([hidden])': {
    display: 'block',
  },
})

export const avatarImage = css({
  // Positioned so it paints over the absolutely positioned arrow
  'position': 'relative',
  'width': 'var(--avatar-size)',
  'height': 'var(--avatar-size)',
  'borderRadius': '50%',
  // The `xMidYMid meet` fit of the svg <image> this replaces
  'objectFit': 'contain',
  '&:not([hidden])': {
    display: 'block',
  },
})

export const avatarStrokes = css({
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

export const avatarBgStroke = css({
  strokeWidth: '4px',
  stroke: 'var(--card-bg-color)',
})

export const avatarStroke = css({
  'strokeWidth': '2px',
  'stroke': 'var(--avatar-bg-color)',
  '[data-status="editing"] &': {
    strokeDasharray: '2 4',
    strokeLinecap: 'round',
  },
})

export const avatarStack = css({
  'whiteSpace': 'nowrap',
  '& > div': {
    verticalAlign: 'top',
  },
  '& > div:not([hidden])': {
    display: 'inline-block',
  },
})

export const avatarCounter = css({
  'alignItems': 'center',
  'justifyContent': 'center',
  'boxSizing': 'border-box',
  'userSelect': 'none',
  'color': 'var(--card-fg-color)',
  'background': 'var(--card-bg-color)',
  'boxShadow': '0 0 0 1px var(--card-bg-color), inset 0 0 0 1px var(--card-hairline-hard-color)',
  '&:not([hidden])': {
    display: 'flex',
  },
})

export const avatarInitials = css({
  'width': '100%',
  'height': '100%',
  'color': 'var(--avatar-fg-color)',
  'alignItems': 'center',
  'justifyContent': 'center',
  'textTransform': 'uppercase',
  'textAlign': 'center',
  'borderRadius': '50%',
  '&:not([hidden])': {
    display: 'flex',
  },
})
