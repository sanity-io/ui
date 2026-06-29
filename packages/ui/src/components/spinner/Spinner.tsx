import {SpinnerIcon} from '@sanity/icons'
import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {Icon} from '../icon/Icon'
import {type SpinnerProps, spinnerProps} from './spinner.props'

const spinnerClassname = getVersionedClassname('sui-Spinner')

/** @public */
export function Spinner({size = 2, ...props}: SpinnerProps) {
  const {className, style, ...rest} = getProps({size, ...props}, spinnerProps)

  return (
    <Icon
      icon={SpinnerIcon}
      className={clsx(spinnerClassname, className)}
      style={style}
      data-ui="Spinner"
      role="status"
      aria-label="Loading..."
      {...rest}
    />
  )
}
