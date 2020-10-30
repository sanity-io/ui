import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {codeFont} from '../../styles'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {codeBaseStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  muted?: boolean
  size?: number | number[]
  weight?: string
}

const Root = styled.pre<{muted: boolean; scheme: ColorSchemeKey; size: number[]}>(
  codeBaseStyles,
  codeFont
)

export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, language, muted = false, size = 2, ...restProps} = props
    const card = useCard()

    return (
      <Root data-ui="Code" {...restProps} ref={ref} scheme={card.scheme} size={size} muted={muted}>
        {!language && <code>{children}</code>}
        {language && <Refractor inline language={language} value={String(children)} />}
      </Root>
    )
  }
)

Code.displayName = 'Code'
