import clsx from 'clsx'
import {isValidElement, type ComponentPropsWithRef, type ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Icon} from '../icon/Icon'
import {Text} from '../text/Text'
import {type BadgeProps, badgeProps} from './badge.props'

const badgeClassName = suffixClassName('sui-Badge')

/** @public */
export function Badge<T extends ElementType = 'span'>({
  tone = 'neutral',
  ...props
}: BadgeProps<T> & Omit<ComponentPropsWithRef<T>, keyof BadgeProps<T>>) {
  const {
    as,
    children,
    className,
    style,
    iconStart: IconStart,
    text,
    ...rest
  } = getProps({tone, ...props}, badgeProps)
  const Component = as || 'span'

  const paddingClasses = IconStart ? 'sui-p1' : 'sui-px2 sui-py1'

  const badgeClasses = clsx(
    badgeClassName,
    `${paddingClasses} sui-radius-full sui-display-inline-flex sui-align-items-center sui-gap1`,
  )

  return (
    <Component className={clsx(badgeClasses, className)} style={style} data-ui="Badge" {...rest}>
      {IconStart &&
        (isValidElement(IconStart) ? (
          IconStart
        ) : (
          <Icon icon={IconStart} marginX={-1} marginY={-2} size={0} />
        ))}
      {text && (
        <Text size={1} trim>
          {text}
        </Text>
      )}
      {children}
    </Component>
  )
}

export type {BadgeProps}
