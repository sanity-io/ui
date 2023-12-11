/** @jest-environment jsdom */

import {buildTheme, getScopedTheme} from '@sanity/ui/theme'
import {responsivePaddingStyle} from './paddingStyle'

const theme = getScopedTheme(buildTheme(), 'light', 'default')

describe('styles/padding', () => {
  it('should 1', () => {
    const styles = responsivePaddingStyle({$padding: [0], theme})

    expect(styles).toEqual([[{padding: 0}]])
  })

  it('should 2', () => {
    const styles = responsivePaddingStyle({$padding: [0, 1, 2], theme})

    expect(styles).toEqual([
      [
        {
          padding: 0,
        },
        {
          '@media screen and (min-width: 360px)': {padding: '0.25rem'},
        },
        {
          '@media screen and (min-width: 600px)': {padding: '0.5rem'},
        },
      ],
    ])
  })
})
