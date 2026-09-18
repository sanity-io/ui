import SelectIcon from '@sanity/icons/Select'
import clsx from 'clsx'

import type {FormElementDensity} from '../../types/FormElement'
import type {Space} from '../../types/Space'
import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {type SelectProps, selectProps} from './select.props'

const selectClassName = suffixClassName('sui-Select')
const densityValues: Record<FormElementDensity, Space> = {
  regular: 1,
  loose: 2,
}

/** @public */
export function Select({
  density = 'regular',
  disabled = false,
  hasError = false,
  ...props
}: SelectProps) {
  const {children, className, style, ...rest} = getProps({density, disabled, ...props}, selectProps)

  const dv = densityValues[density]

  const selectClasses = clsx(
    selectClassName,
    hasError && 'sui-error',
    'sui-radius2',
    'sui-text-body1',
    `sui-p${dv}`,
    className,
  )

  const iconClasses = `sui-position-absolute sui-display-flex sui-align-items-center sui-pl${dv} sui-right${dv}`

  return (
    <div className="sui-position-relative">
      <select
        data-ui="Select"
        className={selectClasses}
        style={style}
        {...rest}
        aria-invalid={hasError || undefined}
        disabled={disabled}
      >
        {children}
      </select>
      <div className={iconClasses} data-ui="Select-picker-icon">
        <Icon icon={SelectIcon} size={1} />
      </div>
    </div>
  )
}

export type {SelectProps}
