import {ChevronDownIcon} from '@sanity/icons'
import {
  _inputElement,
  ResponsiveProp,
  select,
  selectPresentation,
  SelectStyleProps,
} from '@sanity/ui/css'
import {Space} from '@sanity/ui/theme'
import {ForwardedRef, forwardRef, useImperativeHandle, useRef} from 'react'

import {useCustomValidity} from '../../hooks'
import {Props} from '../../types'
import {Box} from '../box'
import {Text} from '../text'

/**
 * @public
 */
export interface SelectProps extends SelectStyleProps {
  customValidity?: string
  readOnly?: boolean
  /** @deprecated Use `gap` instead. */
  space?: ResponsiveProp<Space>
}

/**
 * The `Select` component provides control of options.
 *
 * @public
 */
export const Select = forwardRef(function Select(
  props: Props<SelectProps, 'select'>,
  forwardedRef: ForwardedRef<HTMLSelectElement>,
) {
  const {
    border = true,
    children,
    customValidity,
    disabled,
    fontSize = 1,
    gap,
    padding = 2,
    radius = 2,
    readOnly,
    space = 2,
    ...restProps
  } = props

  const ref = useRef<HTMLSelectElement | null>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    forwardedRef,
    () => ref.current,
  )

  useCustomValidity(ref, customValidity)

  return (
    <div
      data-ui="Select"
      className={select({border, fontSize, padding, radius, gap: gap ?? space})}
      data-icon-right=""
    >
      <select
        data-read-only={!disabled && readOnly ? '' : undefined}
        {...restProps}
        className={_inputElement()}
        disabled={disabled || readOnly}
        ref={ref}
      >
        {children}
      </select>
      <span className={selectPresentation()}>
        <Box as="span" display="inline-block" padding={padding}>
          <Text size={fontSize}>
            <ChevronDownIcon />
          </Text>
        </Box>
      </span>
    </div>
  )
})

Select.displayName = 'ForwardRef(Select)'
