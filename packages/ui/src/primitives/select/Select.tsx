import {ChevronDownIcon} from '@sanity/icons'
import {_input_element, select, select_presentation, type SelectStyleProps} from '@sanity/ui-css'
import {useImperativeHandle, useRef} from 'react'

import type {ComponentType, Props} from '../../core/types'
import {useCustomValidity} from '../../hooks/useCustomValidity'
import {Box} from '../box/Box'
import {Text} from '../text/Text'

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
    radius = 1,
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
        <Box as="span" display="inline-block" padding={padding}>
          <Text size={fontSize}>
            <ChevronDownIcon />
          </Text>
        </Box>
      </span>
    </span>
  )
}
