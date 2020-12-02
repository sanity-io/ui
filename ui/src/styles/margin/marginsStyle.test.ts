import {studioTheme, Theme} from '../../theme'
import {responsiveMarginStyle} from './marginStyle'

const {color, ...restTheme} = studioTheme
const theme: Theme = {sanity: {...restTheme, color: color.light.default}}

describe('styles/margin', () => {
  it('should', () => {
    const styles = responsiveMarginStyle({margin: 0, theme})

    expect(styles).toEqual([[{margin: 0}]])
  })

  it('should', () => {
    const styles = responsiveMarginStyle({margin: [0, 1, 2], theme})

    expect(styles).toEqual([
      [
        {
          margin: 0,
        },
        {
          '@media(min-width:320px)': {margin: '0.25rem'},
        },
        {
          '@media(min-width:640px)': {margin: '0.5rem'},
        },
      ],
    ])
  })
})
