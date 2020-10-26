import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {margin, padding, radius, textInput} from '../../styles'
import {ColorSchemeKey} from '../../theme'
import {BoxMarginProps, BoxPaddingProps} from '../box'
import {useCard} from '../card'
import {getResponsiveProp} from '../helpers'

interface TextInputProps extends BoxMarginProps, BoxPaddingProps {
  muted?: boolean
  radius?: number | number[]
  size?: number | number[]
  weight?: string
}

const Root = styled.span<{disabled?: boolean; scheme: ColorSchemeKey; uiRadius: number[]}>(
  margin,
  radius as any,
  textInput.base,
  textInput.color as any
)

const Input = styled.input<{uiSize: number[]; weight?: string}>`
  ${padding}
  ${textInput.inputBase}
  ${textInput.inputSize as any}
`

export const TextInput = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'type'>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      disabled,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding = [3],
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = [1],
      size: sizeProp = [2],
      ...restProps
    } = props

    const card = useCard()

    const marginProps = {
      margin: getResponsiveProp(margin),
      marginX: getResponsiveProp(marginX),
      marginY: getResponsiveProp(marginY),
      marginTop: getResponsiveProp(marginTop),
      marginBottom: getResponsiveProp(marginBottom),
      marginLeft: getResponsiveProp(marginLeft),
      marginRight: getResponsiveProp(marginRight),
    }

    const paddingProps = {
      padding: getResponsiveProp(padding),
      paddingX: getResponsiveProp(paddingX),
      paddingY: getResponsiveProp(paddingY),
      paddingTop: getResponsiveProp(paddingTop),
      paddingBottom: getResponsiveProp(paddingBottom),
      paddingLeft: getResponsiveProp(paddingLeft),
      paddingRight: getResponsiveProp(paddingRight),
    }

    const uiSize = getResponsiveProp(sizeProp)

    const uiRadius = getResponsiveProp(radius)

    return (
      <Root {...marginProps} disabled={disabled} scheme={card.scheme} uiRadius={uiRadius}>
        <Input
          {...restProps}
          {...paddingProps}
          disabled={disabled}
          ref={ref}
          type="text"
          uiSize={uiSize}
        />
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
