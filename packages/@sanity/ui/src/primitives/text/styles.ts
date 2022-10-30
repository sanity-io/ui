import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'

export function textBaseStyle(
  props: {$accent?: boolean; $muted?: boolean} & ThemeProps
): CSSObject {
  const {$accent, $muted, theme} = props
  const {weights} = theme.sanity.fonts.text

  return {
    color: 'var(--card-fg-color)',

    ...($accent ? {color: 'var(--card-accent-fg-color)'} : {}),

    ...($muted ? {color: 'var(--card-muted-fg-color)'} : {}),

    '& code': {
      fontFamily: theme.sanity.fonts.code.family,
      borderRadius: 1,
      backgroundColor: 'var(--card-code-bg-color)',
      color: 'var(--card-code-fg-color)',
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

    '& strong': {
      fontWeight: weights.bold,
    },

    '& [data-sanity-icon]': {
      verticalAlign: 'baseline',
    },
  }
}
