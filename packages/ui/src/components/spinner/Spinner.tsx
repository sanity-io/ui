import {SpinnerIcon} from '@sanity/icons/Spinner'
import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {type SpinnerProps, spinnerProps} from './spinner.props'

const spinnerClassName = suffixClassName('sui-Spinner')

/** @public */
export function Spinner({size = 2, ...props}: SpinnerProps) {
  const {className, style, ...rest} = getProps({size, ...props}, spinnerProps)

  return (
    <Icon
      icon={SpinnerIcon}
      className={clsx(spinnerClassName, className)}
      style={style}
      data-ui="Spinner"
      role="status"
      aria-label="Loading..."
      {...rest}
    />
  )
}

export type {SpinnerProps}
