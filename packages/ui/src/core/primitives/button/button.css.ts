import {style} from '@vanilla-extract/css'

export const buttonLoadingBox = style({
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
