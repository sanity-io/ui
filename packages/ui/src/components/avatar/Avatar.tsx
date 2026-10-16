import clsx from 'clsx'
import {useState} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Text} from '../text/Text'
import {type AvatarProps, avatarProps} from './avatar.props'

const avatarClassName = suffixClassName('sui-Avatar')

/** @public */
export function Avatar({color = 'gray', size = 1, ...props}: AvatarProps) {
  const {
    className,
    style,
    'aria-label': ariaLabel,
    initials,
    src,
    ...rest
  } = getProps({color, size, ...props}, avatarProps)
  const [error, setError] = useState(false)

  return (
    <figure
      className={clsx(
        avatarClassName,
        'sui-display-inline-flex sui-align-items-center sui-justify-content-center sui-radius-full sui-position-relative',
        className,
      )}
      style={style}
      data-ui="Avatar"
      {...rest}
    >
      {src && !error ? (
        <img
          className="sui-radius-full sui-width-full sui-height-full"
          src={src}
          alt={ariaLabel || initials}
          onError={() => setError(true)}
        />
      ) : (
        <Text role="img" weight="semibold" aria-label={ariaLabel || initials}>
          {initials.slice(0, 1)}
        </Text>
      )}
    </figure>
  )
}

export type {AvatarProps}
