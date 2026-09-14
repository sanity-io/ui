import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Button} from '../button/Button'
import {Icon} from '../icon/Icon'
import {type IconButtonProps, iconButtonProps} from './iconButton.props'

const iconButtonClassName = suffixClassName('sui-IconButton')

/** @public */
export function IconButton<T extends ElementType = 'button'>(
  props: IconButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof IconButtonProps<T>>,
) {
  const {as, className, style, icon: IconProp, ...rest} = getProps(props, iconButtonProps)
  const Component = as || 'button'

  return (
    <Button
      as={Component}
      className={clsx(iconButtonClassName, className)}
      style={style}
      data-ui="IconButton"
      {...rest}
    >
      <Icon icon={IconProp} margin={-2} size={1} />
    </Button>
  )
}

export type {IconButtonProps}
