import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  margin,
  MarginProps,
  padding,
  PaddingProps,
  radius,
  RadiusProps,
  textInput,
} from '../../styles'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'

interface TextInputProps extends MarginProps, PaddingProps, RadiusProps {
  border?: boolean
  size?: number | number[]
  weight?: string
}

const Root = styled.span<
  {border: boolean; disabled: boolean; scheme: ColorSchemeKey} & RadiusProps
>(margin, radius, textInput.base, textInput.color)

const Input = styled.input<{uiSize: number | number[]; weight?: string}>`
  ${padding}
  ${textInput.inputBase}
  ${textInput.inputSize}
`

export const TextInput = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'size' | 'type'>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const {
      border = true,
      disabled = false,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      padding = 3,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = 1,
      size = 2,
      ...restProps
    } = props

    const card = useCard()

    const marginProps = {
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    }

    const paddingProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    return (
      <Root
        {...marginProps}
        border={border}
        disabled={disabled}
        scheme={card.scheme}
        radius={radius}
      >
        <Input
          {...restProps}
          {...paddingProps}
          disabled={disabled}
          ref={ref}
          type="text"
          uiSize={size}
        />
      </Root>
    )
  }
)

TextInput.displayName = 'TextInput'
