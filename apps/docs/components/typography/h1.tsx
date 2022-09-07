import {forwardRef} from 'react'
import {H} from './h'

export const H1 = forwardRef(function H1(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={1} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
