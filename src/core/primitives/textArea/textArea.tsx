import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, useImperativeHandle, useMemo, useRef} from 'react'
import {styled} from 'styled-components'
import {useCustomValidity} from '../../hooks'
import {_getArrayProp} from '../../styles'
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
import {useRootTheme} from '../../theme'
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
    ...restProps
  } = props

  const ref = useRef<HTMLTextAreaElement | null>(null)

  const rootTheme = useRootTheme()

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  const $radius = useMemo(() => _getArrayProp(radius), [radius])
  const $fontSize = useMemo(() => _getArrayProp(fontSize), [fontSize])
  const $padding = useMemo(() => _getArrayProp(padding), [padding])
  const $space = useMemo(() => _getArrayProp(0), [])

  return (
    <Root data-ui="TextArea">
      <InputRoot>
        <Input
          data-as="textarea"
          data-scheme={rootTheme.scheme}
          data-tone={rootTheme.tone}
          {...restProps}
          $fontSize={$fontSize}
          $padding={$padding}
          $space={$space}
          $scheme={rootTheme.scheme}
          $tone={rootTheme.tone}
          $weight={weight}
          disabled={disabled}
          ref={ref}
        />
        <Presentation
          $radius={$radius}
          $scheme={rootTheme.scheme}
          $tone={rootTheme.tone}
          data-border={border ? '' : undefined}
          data-scheme={rootTheme.scheme}
          data-tone={rootTheme.tone}
        />
      </InputRoot>
    </Root>
  )
})
