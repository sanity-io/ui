import {FlexStyleProps} from './types'

export function flexStyle(props: FlexStyleProps) {
  return [
    {
      alignItems: props.align,
      justifyContent: props.justify,

      '&:not([hidden])': {
        display: 'flex',
      },
    },
    responsiveFlexColumnStyle,
  ]
}

export function responsiveFlexColumnStyle(props: FlexStyleProps) {
  if (props.direction && props.direction.startsWith('column')) {
    return {
      flexDirection: props.direction,
      flexWrap: props.wrap,

      '&>*': {
        minHeight: 0,
      },
    }
  }

  return {
    flexDirection: props.direction,
    flexWrap: props.wrap,

    '&>*': {
      minWidth: 0,
    },
  }
}
