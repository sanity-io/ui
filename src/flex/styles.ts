import {css} from 'styled-components'
import {FlexDirection} from './types'

export function flexBaseStyles() {
  return css`
    display: flex;
  `
}

export function flexColumnStyles(props: {direction: FlexDirection}) {
  if (props.direction === 'column') {
    return css`
      flex-direction: column;

      & > * {
        min-height: 0;
      }
    `
  }

  return css`
    flex-direction: row;

    & > * {
      min-width: 0;
    }
  `
}
