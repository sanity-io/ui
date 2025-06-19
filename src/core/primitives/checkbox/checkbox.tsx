import {CheckmarkIcon, RemoveIcon} from '@sanity/icons'
import {checkbox, checkboxInput, checkboxPresentation} from '@sanity/ui/css'
import {useEffect, useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks/useCustomValidity'
import type {ComponentType, Props} from '../../types/props'

/** @public */
export const DEFAULT_CHECKBOX_ELEMENT = 'input'

/** @public */
export type CheckboxOwnProps = {
  indeterminate?: boolean
  customValidity?: string
}

/** @public */
export type CheckboxElementType = 'input' | ComponentType

/** @public */
export type CheckboxProps<E extends CheckboxElementType = CheckboxElementType> = Props<
  CheckboxOwnProps,
  E
>

/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * @public
 */
export function Checkbox<E extends CheckboxElementType = typeof DEFAULT_CHECKBOX_ELEMENT>(
  props: CheckboxProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_CHECKBOX_ELEMENT,
    className,
    disabled,
    indeterminate,
    customValidity,
    readOnly,
    ref: forwardedRef,
    style,
    ...rest
  } = props as CheckboxProps<typeof DEFAULT_CHECKBOX_ELEMENT>

  const ref = useRef<HTMLInputElement | null>(null)

  useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useEffect(() => {
    if (ref.current) {
      // Set the indeterminate state
      ref.current.indeterminate = indeterminate || false
    }
  }, [indeterminate])

  useCustomValidity(ref, customValidity)

  return (
    <span className={checkbox({className})} data-ui="Checkbox" style={style}>
      <Element
        {...rest}
        className={checkboxInput()}
        data-invalid={customValidity ? '' : undefined}
        data-read-only={!disabled && readOnly ? '' : undefined}
        disabled={disabled || readOnly}
        type="checkbox"
        readOnly={readOnly}
        ref={ref}
      />
      <span className={checkboxPresentation()}>
        <CheckmarkIcon />
        <RemoveIcon />
      </span>
    </span>
  )
}
