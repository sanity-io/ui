import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {codeBaseStyles, codeSizeStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number
}

const Root = styled.div(codeBaseStyles, codeSizeStyles)

export const Code = forwardRef((props: React.HTMLProps<HTMLDivElement> & CodeProps, ref) => {
  const {children, size, ...restProps} = props

  return (
    <Root data-ui="Code" {...restProps} ref={ref} size={size}>
      {children}
    </Root>
  )
})

Code.displayName = 'Code'
