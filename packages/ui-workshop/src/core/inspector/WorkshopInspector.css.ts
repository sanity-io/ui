import {style} from '@vanilla-extract/css'

import {workshopAside} from '../styles.css'

export const workshopInspector = style([
  workshopAside,
  {
    '@media': {
      'screen and (min-width: 600px)': {
        borderLeft: `1px solid var(--card-border-color)`,
      },
    },
  },
])
