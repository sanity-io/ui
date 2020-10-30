const BORDER_VALUE = '1px solid var(--card-hairline-soft-color)'

export function border(props: {
  border?: boolean
  borderTop?: boolean
  borderRight?: boolean
  borderBottom?: boolean
  borderLeft?: boolean
}) {
  return [
    props.border && {border: BORDER_VALUE},
    props.borderTop && {borderTop: BORDER_VALUE},
    props.borderRight && {borderRight: BORDER_VALUE},
    props.borderBottom && {borderBottom: BORDER_VALUE},
    props.borderLeft && {borderLeft: BORDER_VALUE},
  ]
}
