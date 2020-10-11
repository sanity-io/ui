import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {getResponsiveProp} from '../helpers'
import {codeBaseStyles, codeSizeStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  size?: number | number[]
}

const Root = styled.pre(codeBaseStyles, codeSizeStyles)

export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, language, size: sizeProp = 2, ...restProps} = props
    const size = getResponsiveProp(sizeProp)

    return (
      <Root data-ui="Code" {...restProps} ref={ref} size={size}>
        {!language && <code>{children}</code>}
        {language && <Refractor inline language={language} value={String(children)} />}
      </Root>
    )
  }
)

Code.displayName = 'Code'
