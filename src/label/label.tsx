import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {labelBaseStyles, labelSizeStyles} from './styles'

interface LabelProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

const Root = styled.div(labelBaseStyles, labelSizeStyles)

export const Label = forwardRef((props: React.HTMLProps<HTMLDivElement> & LabelProps, ref) => {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Label" {...restProps} ref={ref} size={size}>
      {children}
    </Root>
  )
})

Label.displayName = 'Label'
