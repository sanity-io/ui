import {SpinnerIcon} from '@sanity/icons'
import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {Icon} from '../icon/Icon'
import {type SpinnerProps, spinnerProps} from './spinner.props'

/** @public */
export function Spinner({size = 2, ...props}: SpinnerProps) {
  const {className, style, ...rest} = getProps({size, ...props}, spinnerProps)

  return (
    <Icon
      icon={SpinnerIcon}
      className={clsx('sui-Spinner', className)}
      style={style}
      data-ui="Spinner"
      role="status"
      aria-label="Loading..."
      {...rest}
    />
  )
}
