import clsx from 'clsx'
import {useState, type ComponentPropsWithRef, type ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
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
  const {as, children, className, style, initials, src, ...rest} = getProps(
    {color, size, ...props},
    avatarProps,
  )
  const Component = as || 'div'
  const [error, setError] = useState(false)

  return (
    <Flex
      as={Component}
      className={clsx(avatarClassName, className)}
      style={style}
      data-ui="Avatar"
      role="img"
      aria-label={props['aria-label'] || initials}
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
          aria-hidden
          radius="full"
          onError={() => setError(true)}
        />
      ) : (
        <Box aria-hidden>{initials}</Box>
      )}
    </Flex>
  )
}

// https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4
