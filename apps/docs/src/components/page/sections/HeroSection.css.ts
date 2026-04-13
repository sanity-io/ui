import {style} from '@vanilla-extract/css'

export const backgroundBox = style({
  position: 'absolute',
  width: '100%',
  height: '400px',
  // maxHeight: '50vh',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  top: 0,
  left: 0,
  zIndex: 0,
})
