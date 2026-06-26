import classNames from 'classnames'
import {Children, type ComponentPropsWithRef, type ElementType, useMemo} from 'react'

import {getProps} from '../../utils/getProps'
import {getVersionedClassname} from '../../utils/getVersionedClassname'
import {inlineChildrenProps, type InlineProps, inlineProps} from './inline.props'

const inlineClassname = getVersionedClassname('sui-Inline')

/** @deprecated Use HStack component instead */
/** @public */
export function Inline<T extends ElementType = 'div'>(
  props: InlineProps<T> & Omit<ComponentPropsWithRef<T>, keyof InlineProps<T>>,
) {
  const {as, children: childrenProp, className, style, ...rest} = getProps(props, inlineProps)
  const {className: childrenClassName} = getProps(props, inlineChildrenProps)
  const Component = as || 'div'

  const children = useMemo(
    () =>
      Children.map(
        childrenProp,
        (child) => child && <div className={childrenClassName}>{child}</div>,
      ),
    [childrenProp],
  )

  return (
    <Component
      className={classNames(inlineClassname, className)}
      style={style}
      data-ui="Inline"
      {...rest}
    >
      {children}
    </Component>
  )
}
