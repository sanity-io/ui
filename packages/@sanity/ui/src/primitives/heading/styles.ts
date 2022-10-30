import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {HeadingStyleProps} from './types'

export function headingBaseStyle(props: HeadingStyleProps & ThemeProps): CSSObject {
  const {$accent, $muted, theme} = props

  return {
    ...($accent ? {color: 'var(--card-accent-fg-color)'} : {}),
    ...($muted ? {color: 'var(--card-muted-fg-color)'} : {}),

    '& code': {
      fontFamily: theme.sanity.fonts.code.family,
      borderRadius: 1,
    },

    '& a': {
      textDecoration: 'none',
      borderRadius: 1,
      color: 'var(--card-link-color)',
      outline: 'none',

      '@media (hover: hover)': {
        '&:hover': {
          textDecoration: 'underline',
        },
      },

      '&:focus': {
        boxShadow: '0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--card-focus-ring-color)',
      },

      '&:focus:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },

    '& [data-sanity-icon]': {
      verticalAlign: 'baseline',
    },
  }
}
