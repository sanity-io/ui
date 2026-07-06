import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {styled} from 'styled-components'

import {useArrayProp, useCustomValidity} from '../../hooks'
import {
  responsiveInputPaddingStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
  textInputBaseStyle,
  textInputFontSizeStyle,
  TextInputInputStyleProps,
  textInputRepresentationStyle,
  TextInputRepresentationStyleProps,
  TextInputResponsivePaddingStyleProps,
  textInputRootStyle,
} from '../../styles/internal'
import {useRootTheme} from '../../theme'
import {ResponsiveRadiusProps} from '../types'

/**
 * @public
 */
export interface TextAreaProps extends ResponsiveRadiusProps {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  border?: boolean
  customValidity?: string
  fontSize?: number | number[]
  padding?: number | number[]
  weight?: ThemeFontWeightKey
}

const StyledTextArea = styled.span(textInputRootStyle)

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
 * A multiline text input.
 *

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
    __unstable_disableFocusRing,
    ...restProps
  } = props

  const ref = useRef<HTMLTextAreaElement | null>(null)

  const rootTheme = useRootTheme()

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <StyledTextArea data-ui="TextArea">
      <InputRoot>
        <Input
          data-as="textarea"
          data-scheme={rootTheme.scheme}
          data-tone={rootTheme.tone}
          {...restProps}
          $fontSize={useArrayProp(fontSize)}
          $padding={useArrayProp(padding)}
          $scheme={rootTheme.scheme}
          $space={useArrayProp(0)}
          $tone={rootTheme.tone}
          $weight={weight}
          disabled={disabled}
          ref={ref}
        />
        <Presentation
          $radius={useArrayProp(radius)}
          $unstableDisableFocusRing={__unstable_disableFocusRing}
          $scheme={rootTheme.scheme}
          $tone={rootTheme.tone}
          data-border={border ? '' : undefined}
          data-scheme={rootTheme.scheme}
          data-tone={rootTheme.tone}
        />
      </InputRoot>
    </StyledTextArea>
  )
})
TextArea.displayName = 'ForwardRef(TextArea)'
