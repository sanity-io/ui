import clsx from 'clsx'
import {Children, cloneElement, isValidElement, type ReactElement} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {AvatarCounter} from '../avatar-counter/AvatarCounter'
import type {AvatarProps} from '../avatar/avatar.props'
import {type AvatarStackProps, avatarStackProps} from './avatarStack.props'

const avatarStackClassName = suffixClassName('sui-AvatarStack')

/** @public */
export function AvatarStack({size = 1, ...props}: AvatarStackProps) {
  const {
    as,
    children,
    className,
    style,
    maxLength: maxLengthProp,
    size: sizeProp,
    ...rest
  } = getProps({size, ...props}, avatarStackProps)
  const childArray = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<AvatarProps>[]
  const length = childArray.length
  const maxLength = maxLengthProp ?? length
  const slicedArray = length > maxLength ? childArray.slice(length - maxLength, length) : childArray

  return (
    <ul
      className={clsx(avatarStackClassName, 'sui-display-flex', className)}
      style={style}
      data-ui="AvatarStack"
      {...rest}
    >
      {!length ||
        (length > maxLength && (
          <li className="sui-display-flex">
            <AvatarCounter
              count={!length ? 0 : length - maxLength}
              size={sizeProp}
              aria-label={!length ? 'No users' : `+ ${length - maxLength} more users`}
            />
          </li>
        ))}

      {slicedArray.map((child, i) => (
        <li key={i} className="sui-display-flex">
          {cloneElement(child, {size: sizeProp})}
        </li>
      ))}
    </ul>
  )
}

export type {AvatarStackProps}
