import {css} from 'styled-components'
import {FlexAlign, FlexDirection, FlexJustify} from './types'

export function flexBaseStyles(props: {align?: FlexAlign; justify?: FlexJustify}) {
  return css`
    display: flex;
    align-items: ${props.align || 'initial'};
    justify-content: ${props.justify || 'initial'};
  `
}

export function flexColumnStyles(props: {uiDirection: FlexDirection}) {
  if (props.uiDirection === 'column') {
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
