import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {codeBaseStyles, codeSizeStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  size?: number
}

const Root = styled.pre(codeBaseStyles, codeSizeStyles)

export const Code = forwardRef((props: React.HTMLProps<HTMLDivElement> & CodeProps, ref) => {
  const {children, language, size, ...restProps} = props

  return (
    <Root data-ui="Code" {...restProps} ref={ref} size={size}>
      {!language && <code>{children}</code>}
      {language && <Refractor inline language={language} value={String(children)} />}
    </Root>
  )
})

Code.displayName = 'Code'
