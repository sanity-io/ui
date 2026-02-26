import type {ComponentType, Props} from '@sanity/ui/core'
import {
  textArea,
  textArea_element,
  textArea_presentation,
  type TextAreaStyleProps,
} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {useImperativeHandle, useRef} from 'react'

/** @public */
export const DEFAULT_TEXT_AREA_ELEMENT = 'textarea'

/** @public */
export type TextAreaOwnProps = TextAreaStyleProps & {
  /**
   * @beta
   */
  __unstable_disableFocusRing?: boolean
  customValidity?: string
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
): React.JSX.Element {
  const {
    __unstable_disableFocusRing,
    as: Element = DEFAULT_TEXT_AREA_ELEMENT,
    border = true,
    className,
    customValidity,
    disabled = false,
    flex,
    fontSize = 2,
    fontWeight,
    gap = 3,
    padding = 3,
    radius = 3,
    readOnly,
    ref: forwardedRef,
    width,
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
        className,
        border,
        flex,
        fontSize,
        fontWeight,
        gap,
        padding,
        radius,
        width,
      })}
      data-ui="TextArea"
    >
      <Element
        {...rest}
        ref={ref}
        className={textArea_element()}
        data-invalid={customValidity ? '' : undefined}
        data-no-focus-ring={__unstable_disableFocusRing ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled}
        readOnly={readOnly}
      />
      <span className={textArea_presentation()} />
    </span>
  )
}
