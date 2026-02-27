import type {ComponentType, Props} from '@sanity/ui/core'
import {radio, radio_input, radio_presentation} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {useImperativeHandle, useRef} from 'react'

/**
 * The default HTML element type rendered by the {@link Radio} component.
 *
 * @public
 */
export const DEFAULT_RADIO_ELEMENT = 'input'

/**
 * Own props for the {@link Radio} component.
 *
 * @public
 */
export type RadioOwnProps = {
  /**
   * Sets a custom validation message on the underlying input element.
   *
   * @remarks
   * When set to a non-empty string, the radio is marked as invalid
   * and the provided message is used as the validation message.
   */
  customValidity?: string
}

/**
 * Accepted values for the `as` prop of the {@link Radio} component.
 *
 * @public
 */
export type RadioElementType = 'input' | ComponentType

/**
 * Props for the {@link Radio} component.
 *
 * @remarks
 * Combines {@link RadioOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders an `<input>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link RadioElementType}.
 *
 * @public
 */
export type RadioProps<E extends RadioElementType = RadioElementType> = Props<RadioOwnProps, E>

/**
 * The `Radio` component allows the user to select one option from a set.
 *
 * @remarks
 * Radio buttons are typically used in groups where only one option
 * can be selected at a time. Each radio renders an `<input type="radio">`
 * by default.
 *
 * @public
 */
export function Radio<E extends RadioElementType = typeof DEFAULT_RADIO_ELEMENT>(
  props: RadioProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_RADIO_ELEMENT,
    className,
    disabled,
    style,
    customValidity,
    readOnly,
    ref: forwardedRef,
    ...rest
  } = props as RadioProps<typeof DEFAULT_RADIO_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span className={radio({className})} data-ui="Radio" style={style}>
      <Element
        {...rest}
        ref={ref}
        className={radio_input()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        type="radio"
      />
      <span className={radio_presentation()} />
    </span>
  )
}
