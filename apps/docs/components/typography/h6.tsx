import {forwardRef} from 'react'
import {H} from './h'

export const H6 = forwardRef(function H6(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={6} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
