import {
  _inputElement,
  _inputPresentation,
  ResponsiveProp,
  textArea,
  TextAreaStyleProps,
} from '@sanity/ui/css'
import {Space, ThemeFontWeightKey} from '@sanity/ui/theme'
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
  customValidity?: string
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
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
    gap,
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
    <span
      className={textArea({border, fontSize, padding, radius, gap: gap ?? space})}
      data-ui="TextArea"
    >
      <textarea {...restProps} className={_inputElement()} disabled={disabled} ref={ref} />
      <span className={_inputPresentation()} />
    </span>
  )
})

TextArea.displayName = 'ForwardRef(TextArea)'
