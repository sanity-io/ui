import type {ComponentType, Props} from '@sanity/ui/core'
import {srOnly} from '@sanity/ui/css'

/**
 * The default HTML element type rendered by the {@link SrOnly} component.
 *
 * @public
 */
export const DEFAULT_SR_ONLY_ELEMENT = 'span'

/**
 * Own props for the {@link SrOnly} component.
 *
 * @public
 */
export type SrOnlyOwnProps = {} // eslint-disable-line @typescript-eslint/no-empty-object-type

/**
 * Accepted values for the `as` prop of the {@link SrOnly} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `SrOnly`.
 *
 * @public
 */
export type SrOnlyElementType = 'span' | ComponentType

/**
 * Props for the {@link SrOnly} component.
 *
 * @remarks
 * Combines {@link SrOnlyOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<span>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SrOnlyElementType}.
 *
 * @public
 */
export type SrOnlyProps<E extends SrOnlyElementType = SrOnlyElementType> = Props<SrOnlyOwnProps, E>

/**
 * The `SrOnly` component renders content that is visually hidden but remains
 * accessible to screen readers and other assistive technologies.
 *
 * @remarks
 * Use `SrOnly` to provide additional context or labels for assistive technology
 * users without affecting the visual layout of the page.
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
