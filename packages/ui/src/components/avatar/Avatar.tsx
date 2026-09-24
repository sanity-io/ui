import clsx from 'clsx'
import {useState, type ComponentPropsWithRef, type ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {Eyebrow} from '../eyebrow/Eyebrow'
import {Flex} from '../flex/Flex'
import {type AvatarProps, avatarProps} from './avatar.props'

const avatarClassName = suffixClassName('sui-Avatar')
const avatarImgClassName = suffixClassName('sui-AvatarImg')

/** @public */
export function Avatar<T extends ElementType = 'div'>({
  color = 'magenta',
  size = 1,
  ...props
}: AvatarProps<T> & Omit<ComponentPropsWithRef<T>, keyof AvatarProps<T>>) {
  const {
    as,
    children,
    className,
    style,
    'aria-label': ariaLabel,
    initials,
    src,
    ...rest
  } = getProps({color, size, ...props}, avatarProps)
  const Component = as || 'div'
  const [error, setError] = useState(false)

  return (
    <Flex
      as={Component}
      className={clsx(avatarClassName, className)}
      style={style}
      data-ui="Avatar"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      radius="full"
      {...rest}
    >
      {src && !error ? (
        <Box
          as="img"
          className={avatarImgClassName}
          src={src}
          alt={ariaLabel || initials}
          radius="full"
          onError={() => setError(true)}
        />
      ) : (
        <Eyebrow role="img" aria-label={ariaLabel || initials}>
          {initials.slice(0, 2)}
        </Eyebrow>
      )}
    </Flex>
  )
}

export type {AvatarProps}
