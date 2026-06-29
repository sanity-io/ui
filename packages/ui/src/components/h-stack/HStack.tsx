import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {Flex} from '../flex/Flex'
import {type HStackProps, hStackProps} from './hStack.props'

const hStackClassname = getVersionedClassname('sui-HStack')

/** @public */
export function HStack<T extends ElementType = 'div'>(
  props: HStackProps<T> & Omit<ComponentPropsWithRef<T>, keyof HStackProps<T>>,
) {
  const {as, children, className, style, ...rest} = getProps(props, hStackProps)
  const Component = as || 'div'

  return (
    <Flex
      as={Component}
<<<<<<< HEAD
      className={classNames(hStackClassname, className)}
=======
      className={clsx('sui-HStack', className)}
>>>>>>> main
      style={style}
      data-ui="HStack"
      display="inline-flex"
      alignItems="center"
      flexWrap="wrap"
      {...rest}
    >
      {children}
    </Flex>
  )
}
