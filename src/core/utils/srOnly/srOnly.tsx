import {_composeClassNames, srOnly} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_SR_ONLY_ELEMENT = 'span'

/** @public */
export type SrOnlyOwnProps = {} // eslint-disable-line @typescript-eslint/no-empty-object-type

/** @public */
export type SrOnlyElementType = 'span' | ComponentType

/** @public */
export type SrOnlyProps<E extends SrOnlyElementType = SrOnlyElementType> = Props<SrOnlyOwnProps, E>

/** @public */
export function SrOnly<E extends SrOnlyElementType = typeof DEFAULT_SR_ONLY_ELEMENT>(
  props: SrOnlyProps<E>,
) {
  const {
    as: Element = DEFAULT_SR_ONLY_ELEMENT,
    children,
    className,
    ...rest
  } = props as SrOnlyProps<typeof DEFAULT_SR_ONLY_ELEMENT>

  return (
    <Element
      data-ui="SrOnly"
      {...rest}
      aria-hidden
      className={_composeClassNames(className, srOnly())}
    >
      {children}
    </Element>
  )
}

SrOnly.displayName = 'SrOnly'
