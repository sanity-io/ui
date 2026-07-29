import clsx from 'clsx'
import {type ComponentPropsWithRef, type ElementType, isValidElement} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Flex} from '../flex/Flex'
import {Icon} from '../icon/Icon'
import {Spinner} from '../spinner/Spinner'
import {Text} from '../text/Text'
import {type ButtonProps, buttonProps} from './button.props'

const buttonClassName = suffixClassName('sui-Button')

/** @public */
export function Button<T extends ElementType = 'button'>({
  density = 'regular',
  level = 'primary',
  tone = 'neutral',
  ...props
}: ButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof ButtonProps<T>>) {
  const {
    as,
    children,
    className,
    disabled,
    style,
    iconStart: IconStart,
    iconEnd: IconEnd,
    loading,
    text,
    ...rest
  } = getProps({density, level, tone, ...props}, buttonProps)
  const Component = as || 'button'

  return (
    <Component
      className={clsx(
        buttonClassName,
        'sui-display-inline-flex sui-align-items-center sui-justify-content-center sui-radius2 sui-position-relative sui-overflow-hidden',
        className,
      )}
      style={style}
      data-ui="Button"
      disabled={disabled || loading}
      aria-busy={loading ? true : undefined}
      {...rest}
    >
      {loading && (
        <Flex position="absolute" inset={0} alignItems="center" justifyContent="center">
          <Spinner />
        </Flex>
      )}

      {IconStart &&
        (isValidElement(IconStart) ? (
          IconStart
        ) : (
          <Icon icon={IconStart} marginX={-1} marginY={-2} size={1} />
        ))}

      {text && (
        <Text size={1} weight="medium" trim>
          {text}
        </Text>
      )}

      {children}
      {IconEnd &&
        (isValidElement(IconEnd) ? (
          IconEnd
        ) : (
          <Icon icon={IconEnd} marginX={-1} marginY={-2} size={1} />
        ))}
    </Component>
  )
}

export type {ButtonProps}
