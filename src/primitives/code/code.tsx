/* eslint-disable @typescript-eslint/no-explicit-any */
import {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {responsiveCodeFontStyle, ResponsiveFontStyleProps} from '../../styles/internal'
import {useToneContext} from '../../theme/toneContext/useToneContext'
import {codeBaseStyle, CodeBaseStyleProps} from './styles'

/**
 * @public
 */
export interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  size?: number | number[]
  weight?: string
}

const Root = styled.pre<CodeBaseStyleProps & ResponsiveFontStyleProps>(
  codeBaseStyle,
  responsiveCodeFontStyle,
)

/**
 * @public
 */
export const Code = forwardRef(function Code(
  props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {children, language: languageProp, size = 2, weight, ...restProps} = props
  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? Refractor.hasLanguage(language as any) : false
  const {scheme} = useToneContext()

  return (
    <Root
      data-ui="Code"
      {...restProps}
      $size={useArrayProp(size)}
      $weight={weight}
      ref={ref}
      $scheme={scheme}
    >
      {!(language && registered) && <code>{children}</code>}
      {language && registered && <Refractor inline language={language} value={String(children)} />}
    </Root>
  )
})
