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
