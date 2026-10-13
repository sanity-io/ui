import {css, firstThatWorks} from '#styled-system/css'

export const buttonRoot = css({
  'WebkitFontSmoothing': 'inherit',
  'appearance': 'none',
  'display': 'inline-flex',
  'alignItems': 'center',
  'font': 'inherit',
  'border': 0,
  'outline': 'none',
  'userSelect': 'none',
  'textDecoration': 'none',
  'boxSizing': 'border-box',
  'padding': 0,
  'whiteSpace': 'nowrap',
  'textAlign': 'left',
  'position': 'relative',
  'verticalAlign': 'top',
  '&::-moz-focus-inner': {
    border: 0,
    padding: 0,
  },
  '& > span': {
    display: 'block',
    flex: 1,
    minWidth: 0,
    borderRadius: 'inherit',
  },
})

export const buttonWidthFill = css({
  width: firstThatWorks('stretch', '-webkit-fill-available', '-moz-available'),
})

export const buttonLoadingBox = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--card-bg-color)',
  borderRadius: 'inherit',
  zIndex: 1,
  boxShadow: 'inherit',
})
