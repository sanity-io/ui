import {forwardRef} from 'react'
import {H} from './h'

export const H3 = forwardRef(function H3(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={3} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
