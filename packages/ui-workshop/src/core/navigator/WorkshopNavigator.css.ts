import {style} from '@vanilla-extract/css'

import {workshopAside} from '../styles.css'

export const workshopNavigator = style([
  workshopAside,
  {
    '@media': {
      'screen and (min-width: 600px)': {
        borderRight: `1px solid var(--card-border-color)`,
      },
    },
  },
])
