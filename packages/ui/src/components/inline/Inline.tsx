import clsx from 'clsx'
import {Children, type ComponentPropsWithRef, type ElementType} from 'react'

import {getProps} from '../../utils/getProps'
import {suffixClassName} from '../../utils/suffixClassName'
import {inlineChildrenProps, type InlineProps, inlineProps} from './inline.props'

const inlineClassName = suffixClassName('sui-Inline')

/** @deprecated Use HStack component instead */
/** @public */
export function Inline<T extends ElementType = 'div'>(
  // oxlint-disable-next-line no-deprecated
  props: InlineProps<T> & Omit<ComponentPropsWithRef<T>, keyof InlineProps<T>>,
) {
  const {as, children: childrenProp, className, style, ...rest} = getProps(props, inlineProps)
  const {className: childrenClassName} = getProps(props, inlineChildrenProps)
  const Component = as || 'div'

  const children = Children.map(
    childrenProp,
    (child) => child && <div className={childrenClassName}>{child}</div>,
  )

  return (
    <Component
      className={clsx(inlineClassName, className)}
      style={style}
      data-ui="Inline"
      {...rest}
    >
      {children}
    </Component>
  )
}

// oxlint-disable-next-line no-deprecated
export type {InlineProps}
