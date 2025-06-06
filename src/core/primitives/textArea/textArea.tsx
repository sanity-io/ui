import {
  _inputElement,
  _inputPresentation,
  type ResponsiveProp,
  textArea,
  type TextAreaStyleProps,
} from '@sanity/ui/css'
import type {Space} from '@sanity/ui/theme'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types/props'

/** @public */
export const DEFAULT_TEXT_AREA_ELEMENT = 'textarea'

/** @public */
export type TextAreaOwnProps = TextAreaStyleProps & {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  customValidity?: string
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

/** @public */
export type TextAreaElementType = 'textarea' | ComponentType

/** @public */
export type TextAreaProps<E extends TextAreaElementType = TextAreaElementType> = Props<
  TextAreaOwnProps,
  E
>

/**
 * A multiline text input.
 *
 * @public
 */
export function TextArea<E extends TextAreaElementType = typeof DEFAULT_TEXT_AREA_ELEMENT>(
  props: TextAreaProps<E>,
) {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_AREA_ELEMENT,
    border = true,
    customValidity,
    disabled = false,
    fontSize = 2,
    gap,
    padding = 3,
    radius = 2,
    readOnly,
    ref: forwardedRef,
    space = 3,
    ...rest
  } = props as TextAreaProps<typeof DEFAULT_TEXT_AREA_ELEMENT>

  const ref = useRef<HTMLTextAreaElement | null>(null)

  useImperativeHandle<HTMLTextAreaElement | null, HTMLTextAreaElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span
      className={textArea({
        border,
        fontSize,
        padding,
        radius,
        gap: gap ?? space,
      })}
      data-invalid={customValidity ? '' : undefined}
      data-read-only={!disabled && readOnly ? '' : undefined}
      data-ui="TextArea"
    >
      <Element
        {...rest}
        className={_inputElement()}
        data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
        ref={ref}
      />
      <span className={_inputPresentation()} />
    </span>
  )
}
