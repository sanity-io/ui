import React, {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {responsiveCodeFontStyle} from '../../styles'
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
  responsiveCodeFontStyle
)

export const Code = forwardRef(
  (props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'size'>, ref) => {
    const {children, language: languageProp, muted = false, size = 2, ...restProps} = props
    const card = useCard()
    const language = typeof languageProp === 'string' ? languageProp : undefined
    const registered = language ? Refractor.hasLanguage(language as any) : false

    return (
      <Root data-ui="Code" {...restProps} ref={ref} scheme={card.scheme} size={size} muted={muted}>
        {(!language || (language && !registered)) && <code>{children}</code>}

        {language && registered && (
          <Refractor inline language={language} value={String(children)} />
        )}
      </Root>
    )
  }
)

Code.displayName = 'Code'
