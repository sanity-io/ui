import clsx from 'clsx'
import type {ComponentPropsWithRef, ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {Box} from '../box/Box'
import {type IndicatorProps, indicatorProps} from './indicator.props'

const indicatorClassName = suffixClassName('sui-Indicator')

/** @beta */
export function Indicator<T extends ElementType = 'span'>({
  tone = 'neutral',
  ...props
}: IndicatorProps<T> & Omit<ComponentPropsWithRef<T>, keyof IndicatorProps<T>>) {
  const {as, children, className, style, label, ...rest} = getProps(
    {tone, ...props},
    indicatorProps,
  )
  const Component = as || 'span'
  const ariaLabel = label || rest['aria-label']

  return (
    <Box
      as={Component}
      className={clsx(indicatorClassName, className)}
      style={style}
      data-ui="Indicator"
      width="5px"
      height="5px"
      radius="full"
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      role={ariaLabel ? 'img' : undefined}
      {...rest}
    >
      {children}
    </Box>
  )
}

export type {IndicatorProps}
