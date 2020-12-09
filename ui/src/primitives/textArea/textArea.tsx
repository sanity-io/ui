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
import {ThemeFontWeightKey} from '../../theme'

interface TextInputProps extends ResponsivePaddingStyleProps, ResponsiveRadiusProps {
  border?: boolean
  fontSize?: number | number[]
  weight?: ThemeFontWeightKey
  customValidity?: string
}

const Root = styled.span(textInputStyle.root)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

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
      fontSize: fontSizeProp = [2],
      padding = [3],
      paddingX,
      customValidity,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      radius = [1],
      ...restProps
    } = props

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

    const fontSize = getResponsiveProp(fontSizeProp)

    return (
      <Root>
        <InputRoot>
          <Input
            data-as="textarea"
            {...restProps}
            {...paddingProps}
            disabled={disabled}
            fontSize={fontSize}
            ref={ref}
          />
          <Presentation border={border} radius={radius} />
        </InputRoot>
      </Root>
    )
  }
)

TextArea.displayName = 'TextArea'
