import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'
import {getResponsiveProp} from '../helpers'
import {codeBaseStyles, codeSizeStyles} from './styles'

interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  muted?: boolean
  size?: number | number[]
}

const Root = styled.pre<{scheme: ColorSchemeKey; size: number[]; uiMuted?: boolean}>(
  codeBaseStyles,
  codeSizeStyles
)

export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, language, muted, size: sizeProp = 2, ...restProps} = props
    const size = getResponsiveProp(sizeProp)
    const card = useCard()

    return (
      <Root
        data-ui="Code"
        {...restProps}
        ref={ref}
        scheme={card.scheme}
        size={size}
        uiMuted={muted}
      >
        {!language && <code>{children}</code>}
        {language && <Refractor inline language={language} value={String(children)} />}
      </Root>
    )
  }
)

Code.displayName = 'Code'
