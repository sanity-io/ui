import clsx from 'clsx'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Eyebrow} from '../eyebrow/Eyebrow'
import {type AvatarCounterProps, avatarCounterProps} from './avatarCounter.props'

const avatarCounterClassName = suffixClassName('sui-AvatarCounter')

/** @public */
export function AvatarCounter({size = 1, ...props}: AvatarCounterProps) {
  const {
    className,
    style,
    'aria-label': ariaLabel,
    count,
    ...rest
  } = getProps({size, ...props}, avatarCounterProps)

  return (
    <figure
      className={clsx(
        avatarCounterClassName,
        'sui-display-inline-flex sui-align-items-center sui-justify-content-center sui-radius-full sui-border',
        className,
      )}
      style={style}
      data-ui="AvatarCounter"
      {...rest}
    >
      <Eyebrow role="img" aria-label={ariaLabel || `+ ${count} more`}>
        {count}
      </Eyebrow>
    </figure>
  )
}

export type {AvatarCounterProps}
