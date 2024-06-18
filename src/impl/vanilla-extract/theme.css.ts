import {createTheme} from '@vanilla-extract/css'

const [className, vars] = createTheme({
  space: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '20px',
    5: '32px',
    6: '52px',
    7: '84px',
    8: '136px',
    9: '220px',
  },
})

export const theme = {className, vars}
