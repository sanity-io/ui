import {SelectIcon} from '@sanity/icons'
import type {ComponentType, Props} from '@sanity/ui/core'
import {_input_element, select, select_presentation, type SelectStyleProps} from '@sanity/ui/css'
import {useCustomValidity} from '@sanity/ui/hooks'
import {Text} from '@sanity/ui/primitives/text'
import {useImperativeHandle, useRef} from 'react'

/** @public */
export const DEFAULT_SELECT_ELEMENT = 'select'

/** @public */
export type SelectOwnProps = SelectStyleProps & {
  customValidity?: string
  readOnly?: boolean
}

/** @public */
export type SelectElementType = 'select' | ComponentType

/** @public */
export type SelectProps<E extends SelectElementType = SelectElementType> = Props<SelectOwnProps, E>

/**
 * The `Select` component provides control of options.
 *
 * @public
 */
export function Select<E extends SelectElementType = typeof DEFAULT_SELECT_ELEMENT>(
  props: SelectProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_SELECT_ELEMENT,
    border = true,
    children,
    customValidity,
    disabled,
    flex,
    fontSize = 2,
    gap = 2,
    padding = 3,
    radius,
    readOnly,
    ref: forwardedRef,
    width = 'fill',
    ...rest
  } = props as SelectProps<typeof DEFAULT_SELECT_ELEMENT>

  const ref = useRef<HTMLSelectElement | null>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <span
      className={select({border, fontSize, flex, gap, padding, radius, width})}
      data-icon-right=""
      data-ui="Select"
    >
      <Element {...rest} ref={ref} className={_input_element()} disabled={disabled || readOnly}>
        {children}
      </Element>
      <span className={select_presentation()}>
        <span>
          <Text size={fontSize}>
            <SelectIcon />
          </Text>
        </span>
      </span>
    </span>
  )
}
