import {radio, radioInput, radioPresentation} from '@sanity/ui/css'
import {useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_RADIO_ELEMENT = 'input'

/** @public */
export type RadioOwnProps = {
  customValidity?: string
}

/** @public */
export type RadioElementType = 'input' | ComponentType

/** @public */
export type RadioProps<E extends RadioElementType = RadioElementType> = Props<RadioOwnProps, E>

/**
 * The `Radio` component allows the user to select one option from a set.
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
        className={radioInput()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        readOnly={readOnly}
        ref={ref}
        type="radio"
      />
      <span className={radioPresentation()} />
    </span>
  )
}
