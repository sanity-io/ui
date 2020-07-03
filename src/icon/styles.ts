import {css} from 'styled-components'
import {Theme} from '../theme'

export function iconStyles(props: {size?: number; theme: Theme}) {
  return css`
    display: inline-block;
    vertical-align: top;
    font-size: ${props.size ? props.size * 1.25 : 1.25}em;

    & svg {
      vertical-align: top;
    }
  `
}
