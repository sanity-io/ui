import {forwardRef} from 'react'
import styled from 'styled-components'
import {useForwardedRef, useCustomValidity, useArrayProp} from '../../hooks'
import {
  responsiveInputPaddingStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  TextInputResponsivePaddingStyleProps,
  TextInputInputStyleProps,
  TextInputRepresentationStyleProps,
  textInputRootStyle,
  textInputBaseStyle,
  textInputFontSizeStyle,
  textInputRepresentationStyle,
} from '../../styles/internal'
import {ThemeColorToneKey, ThemeFontWeightKey} from '../../theme'
import {ResponsiveRadiusProps} from '../types'

/**
 * @public
 */
export interface TextAreaProps extends ResponsiveRadiusProps {
  border?: boolean
  customValidity?: string
  fontSize?: number | number[]
  padding?: number | number[]
  weight?: ThemeFontWeightKey
  tone?: ThemeColorToneKey
}

const Root = styled.span(textInputRootStyle)

const InputRoot = styled.span`
  flex: 1;
  min-width: 0;
  display: block;
  position: relative;
`

const Input = styled.textarea<TextInputResponsivePaddingStyleProps & TextInputInputStyleProps>(
  responsiveInputPaddingStyle,
  textInputBaseStyle,
  textInputFontSizeStyle,
)

const Presentation = styled.div<ResponsiveRadiusStyleProps & TextInputRepresentationStyleProps>(
  responsiveRadiusStyle,
  textInputRepresentationStyle,
)

/**
 * @public
 */
export const TextArea = forwardRef(function TextArea(
  props: TextAreaProps & Omit<React.HTMLProps<HTMLTextAreaElement>, 'as'>,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
) {
  const {
    border = true,
    customValidity,
    disabled = false,
    fontSize = 2,
    padding = 3,
    radius = 2,
    weight,
    tone = 'default',
    ...restProps
  } = props

  const ref = useForwardedRef(forwardedRef)

  useCustomValidity(ref, customValidity)

  return (
    <Root data-ui="TextArea">
      <InputRoot>
        <Input
          data-as="textarea"
          data-tone={tone}
          {...restProps}
          $fontSize={useArrayProp(fontSize)}
          $padding={useArrayProp(padding)}
          $space={useArrayProp(0)}
          $tone={tone}
          $weight={weight}
          disabled={disabled}
          ref={ref}
        />
        <Presentation
          $radius={useArrayProp(radius)}
          $tone={tone}
          data-border={border ? '' : undefined}
          data-tone={tone}
        />
      </InputRoot>
    </Root>
  )
})
