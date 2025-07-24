import {_inputElement, _inputPresentation, textArea, type TextAreaStyleProps} from '@sanity/ui/css'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'

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
    customValidity,
    disabled = false,
    fontSize = 2,
    gap = 3,
    padding = 3,
    radius = 2,
    readOnly,
    ref: forwardedRef,
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
        gap,
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
