import {forwardRef} from 'react'
import {H} from './h'

export const H5 = forwardRef(function H5(
  props: Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {children, ...restProps} = props

  return (
    <H level={5} {...restProps} ref={ref}>
      {children}
    </H>
  )
})
