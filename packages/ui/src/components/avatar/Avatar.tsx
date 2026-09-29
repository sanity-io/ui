import clsx from 'clsx'
import {useState} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Eyebrow} from '../eyebrow/Eyebrow'
import {type AvatarProps, avatarProps} from './avatar.props'

const avatarClassName = suffixClassName('sui-Avatar')
const avatarImgClassName = suffixClassName('sui-AvatarImg')

/** @public */
export function Avatar({color = 'magenta', size = 1, ...props}: AvatarProps) {
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
          className={clsx(avatarImgClassName, 'sui-radius-full')}
          src={src}
          alt={ariaLabel || initials}
          onError={() => setError(true)}
        />
      ) : (
        <Eyebrow role="img" aria-label={ariaLabel || initials}>
          {initials.slice(0, 2)}
        </Eyebrow>
      )}
    </figure>
  )
}

export type {AvatarProps}
