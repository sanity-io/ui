import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  getResponsiveProp,
  responsiveInputPaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  textInputStyle,
} from '../../styles'
import {ColorSchemeKey} from '../../theme'
import {useCard} from '../card'

interface TextInputProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  border?: boolean
  size?: number | number[]
  weight?: string
}

const Root = styled.span<{
  border: boolean
  disabled: boolean
  scheme: ColorSchemeKey
  radius?: number | number[]
}>(responsiveRadiusStyle, textInputStyle.root, textInputStyle.color)

const Input = styled.textarea<{uiSize: number[]; weight?: string}>(
  responsiveInputPaddingStyle,
  textInputStyle.inputBase,
  textInputStyle.inputSize
)

export const TextArea = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>,
    ref: React.Ref<HTMLTextAreaElement>
  ) => {
    const {
      border = true,
      disabled = false,
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

    const paddingProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    const uiSize = getResponsiveProp(sizeProp)

    return (
      <Root border={border} disabled={disabled} scheme={card.scheme} radius={radius}>
        <Input {...restProps} {...paddingProps} disabled={disabled} ref={ref} uiSize={uiSize} />
      </Root>
    )
  }
)

TextArea.displayName = 'TextArea'
