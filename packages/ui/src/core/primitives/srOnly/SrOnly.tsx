import {srOnly} from '@sanity/ui/css'

import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_SR_ONLY_ELEMENT = 'span'

/** @public */
export type SrOnlyOwnProps = {} // eslint-disable-line @typescript-eslint/no-empty-object-type

/** @public */
export type SrOnlyElementType = 'span' | ComponentType

/** @public */
export type SrOnlyProps<E extends SrOnlyElementType = SrOnlyElementType> = Props<SrOnlyOwnProps, E>

/**
 * Visually hides content while keeping it accessible to screen readers
 * and other assistive technologies.
 *
 * @remarks
 * The `SrOnly` component renders an element that is visually hidden using
 * CSS techniques (clipping, zero dimensions) but remains in the accessibility
 * tree so that screen readers can announce its content. It also sets
 * `aria-hidden` on the rendered element to prevent duplicate announcements
 * when used alongside visible labels.
 *
 * Use this component to provide additional context for assistive technology
 * users without affecting the visual layout — for example, descriptive labels
 * for icon-only buttons or additional instructions for form fields.
 *
 * @public
 */
export function SrOnly<E extends SrOnlyElementType = typeof DEFAULT_SR_ONLY_ELEMENT>(
  props: SrOnlyProps<E>,
): React.JSX.Element {
  const {
    as: Element = DEFAULT_SR_ONLY_ELEMENT,
    children,
    className,
    ...rest
  } = props as SrOnlyProps<typeof DEFAULT_SR_ONLY_ELEMENT>

  return (
    <Element data-ui="SrOnly" {...rest} aria-hidden className={srOnly({className})}>
      {children}
    </Element>
  )
}
