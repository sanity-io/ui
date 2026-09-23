import SelectIcon from '@sanity/icons/Select'
import clsx from 'clsx'
import {useId} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {type SelectProps, selectProps} from './select.props'

const selectClassName = suffixClassName('sui-Select')

/** @public */
export function Select({density = 'regular', hasError = false, ...props}: SelectProps) {
  const {children, className, style, ...rest} = getProps({density, ...props}, selectProps)

  const anchorId = useId()
  const anchorName = `--anchor-${anchorId}`

  const selectClasses = clsx(
    selectClassName,
    hasError && 'sui-error',
    'sui-radius2',
    'sui-width-full',
    className,
  )

  const iconClasses = `sui-position-absolute sui-display-flex sui-align-items-center sui-px1`

  return (
    <>
      <select
        data-ui="Select"
        className={selectClasses}
        style={{...style, anchorName}}
        {...rest}
        aria-invalid={hasError || undefined}
      >
        {children}
      </select>
      <div className={iconClasses} data-ui="Select-icon" style={{positionAnchor: anchorName}}>
        <Icon icon={SelectIcon} size={1} />
      </div>
    </>
  )
}

export type {SelectProps}
