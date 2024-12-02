import {textArea, TextAreaStyleProps} from '@sanity/ui/css'
import {ThemeFontWeightKey} from '@sanity/ui/theme'
import {forwardRef, useImperativeHandle, useRef} from 'react'
import {useCustomValidity} from '../../hooks'

/**
 * @public
 */
export interface TextAreaProps extends TextAreaStyleProps {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  border?: boolean
  customValidity?: string
  weight?: ThemeFontWeightKey
}

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
    space = 3,
    // weight,
    // __unstable_disableFocusRing,
    ...restProps
  } = props

  const ref = useRef<HTMLTextAreaElement | null>(null)

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span className={textArea({fontSize, padding, radius, space})} data-ui="TextArea">
      <textarea {...restProps} disabled={disabled} ref={ref} />
      <span data-border={border ? '' : undefined} />
    </span>
  )
})

TextArea.displayName = 'ForwardRef(TextArea)'
