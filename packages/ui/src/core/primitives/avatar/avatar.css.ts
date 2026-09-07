import {globalStyle, style} from '@vanilla-extract/css'

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
  position: 'relative',
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
