import {css} from 'styled-components'
import {FlexStyleProps} from './types'

export function flexStyle(props: FlexStyleProps) {
  return [
    {
      display: 'flex',
      alignItems: props.align,
      justifyContent: props.justify,
    },
    responsiveFlexColumnStyle,
  ]
}

export function responsiveFlexColumnStyle(props: FlexStyleProps) {
  if (props.direction && props.direction.startsWith('column')) {
    return css`
      flex-direction: ${props.direction};
      flex-wrap: ${props.wrap};

      & > * {
        min-height: 0;
      }
    `
  }

  return css`
    flex-direction: ${props.direction};
    flex-wrap: ${props.wrap};

    & > * {
      min-width: 0;
    }
  `
}
