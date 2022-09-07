import {forwardRef} from 'react'
import {H} from './h'

export const H4 = forwardRef(function H4(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={4} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
