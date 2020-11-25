import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity} from '../../hooks'
import {
  getResponsiveProp,
  responsiveInputPaddingStyle,
  ResponsivePaddingStyleProps,
  responsiveRadiusStyle,
  ResponsiveRadiusProps,
  textInputStyle,
  TextInputResponsivePaddingStyleProps,
  TextInputInputStyleProps,
  TextInputRepresentationStyleProps,
} from '../../styles'
import {useCard} from '../card'

interface TextInputProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  border?: boolean
  size?: number | number[]
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
  customValidity?: string
}

const Root = styled.span(textInputStyle.root)

const Input = styled.textarea<TextInputResponsivePaddingStyleProps & TextInputInputStyleProps>(
  responsiveInputPaddingStyle,
  textInputStyle.input
)

const Presentation = styled.div<ResponsiveRadiusProps & TextInputRepresentationStyleProps>(
  responsiveRadiusStyle,
  textInputStyle.representation
)

export const TextArea = forwardRef(
  (
    props: TextInputProps & Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>,
    forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const {
      border = true,
      disabled = false,
      padding = [3],
      paddingX,
      customValidity,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = [1],
      size: sizeProp = [2],
      ...restProps
    } = props

    const {scheme} = useCard()

    const paddingProps = {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    }

    const ref = useForwardedRef(forwardedRef)

    useCustomValidity(ref, customValidity)

    const uiSize = getResponsiveProp(sizeProp)

    return (
      <Root>
        <Input
          {...restProps}
          {...paddingProps}
          disabled={disabled}
          ref={ref}
          scheme={scheme}
          uiSize={uiSize}
        />

        <Presentation border={border} radius={radius} scheme={scheme} />
      </Root>
    )
  }
)

TextArea.displayName = 'TextArea'
