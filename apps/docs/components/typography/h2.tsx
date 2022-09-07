import {forwardRef} from 'react'
import {H} from './h'

export const H2 = forwardRef(function H2(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={2} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
