import SelectIcon from '@sanity/icons/Select'
import clsx from 'clsx'

import type {FormElementDensity} from '../../types/FormElement'
import type {Space} from '../../types/Space'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Flex} from '../flex/Flex'
import {Icon} from '../icon/Icon'
import {type SelectProps, selectProps} from './select.props'

const selectClassName = suffixClassName('sui-Select')

/** @public */
export function Select({
  density = 'regular',
  disabled = false,
  error = false,
  ...props
}: SelectProps) {
  const {children, className, style, ...rest} = getProps({density, disabled, ...props}, selectProps)

  const densityValues: Record<FormElementDensity, Space> = {
    regular: 2,
    loose: 3,
  }

  return (
    <Box position="relative">
      <Box
        as="select"
        data-ui="Select"
        className={clsx(selectClassName, error && 'sui-error', className)}
        style={style}
        {...rest}
        aria-invalid={error || undefined}
        disabled={disabled}
        padding={densityValues[density]}
        radius={2}
      >
        {children}
      </Box>
      <Flex
        data-ui="Select-picker-icon"
        position="absolute"
        right={densityValues[density]}
        alignItems="center"
        // Extend background leftwards for extra gap between icon and selected option
        paddingLeft={densityValues[density]}
      >
        <Icon icon={SelectIcon} />
      </Flex>
    </Box>
  )
}

export type {SelectProps}
