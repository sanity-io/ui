import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'

export function labelBaseStyle(
  props: {$accent?: boolean; $muted: boolean} & ThemeProps
): CSSObject {
  const {$accent, $muted, theme} = props
  const {fonts} = theme.sanity

  return {
    textTransform: 'uppercase',

    ...($accent ? {color: 'var(--card-accent-fg-color)'} : {}),

    ...($muted ? {color: 'var(--card-muted-fg-color)'} : {}),

    '& code': {
      fontFamily: fonts.code.family,
      borderRadius: 1,
    },

    '& a': {
      textDecoration: 'none',
      borderRadius: 1,
    },

    '& [data-sanity-icon]': {
      verticalAlign: 'baseline',
    },
  }
}
