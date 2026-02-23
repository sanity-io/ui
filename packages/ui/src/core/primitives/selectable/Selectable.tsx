import {_selectable, type SelectableStyleProps} from '@sanity/ui/css'
import type {ElementTone} from '@sanity/ui/theme'

import type {ComponentType, Props} from '../../types'
import {Box, type BoxOwnProps} from '../box/Box'

/**
 * The default HTML element type rendered by the {@link Selectable} component.
 *
 * @internal
 */
export const DEFAULT_SELECTABLE_ELEMENT = 'button'

/**
 * Own props for the {@link Selectable} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} and {@link SelectableStyleProps} to combine all Box
 * layout/style props with selectable-specific visual properties for interactive
 * list items such as menu items and tree items.
 *
 * Inherited from {@link BoxOwnProps}:
 * - All layout props: `display`, `flex`, `flexDirection`, `alignItems`, `justifyContent`, etc.
 * - All spacing props: `margin`, `marginX`, `marginY`, `padding`, `paddingX`, `paddingY` (and per-side variants).
 * - All sizing props: `width`, `height`, `minWidth`, `minHeight`, `maxWidth`.
 * - All position props: `position`, `inset`, and per-side inset variants.
 * - All visual props: `border`, `shadow`, `overflow`, `muted`, `outline`.
 * - Other: `textAlign`, `pointerEvents`, `sizing`.
 *
 * Inherited from {@link SelectableStyleProps}:
 * - `radius` – Sets the border radius using the theme radius scale (`0 | 1 | 2 | 3 | 4 | 5 | 6 | "full"`).
 * - `tone` – Sets the color tone for the selectable element.
 *
 * @internal
 */
export type SelectableOwnProps = BoxOwnProps &
  SelectableStyleProps & {
    /**
     * When `true`, disables the selectable element, preventing user interaction
     * and applying a disabled visual state.
     *
     * @remarks
     * When rendered as a `<button>`, the native `disabled` attribute is also applied.
     *
     * @type {boolean}
     * @defaultValue undefined
     * @optional
     */
    disabled?: boolean

    /**
     * Sets the URL that the selectable element links to when rendered as an anchor (`as="a"`).
     *
     * @remarks
     * Only meaningful when the selectable renders as an `<a>` element via `as="a"`.
     *
     * @type {string}
     * @defaultValue undefined
     * @optional
     */
    href?: string

    /**
     * When `true`, applies a selected visual state to the element via the
     * `data-selected` attribute.
     *
     * @remarks
     * The selected state is reflected visually through themed background and
     * foreground color changes. It is managed externally by the parent component
     * (e.g. {@link MenuItem}, {@link MenuGroup}, or {@link TreeItem}).
     *
     * @type {boolean}
     * @defaultValue undefined
     * @optional
     */
    selected?: boolean

    /**
     * Sets the color tone of the selectable element, which determines the color
     * scheme applied to its hover, focus, active, and selected states.
     *
     * @remarks
     * The tone maps to a set of semantic color tokens from the theme.
     *
     * Accepted values:
     * - `"default"` – Neutral default tone.
     * - `"neutral"` – Neutral emphasis tone.
     * - `"primary"` – Primary action tone.
     * - `"suggest"` – Suggestive or informational tone.
     * - `"positive"` – Positive or success tone.
     * - `"caution"` – Warning or caution tone.
     * - `"critical"` – Destructive or critical action tone.
     *
     * @type {ElementTone}
     * @defaultValue undefined
     * @optional
     */
    tone?: ElementTone

    /**
     * Sets the `type` attribute on the rendered element.
     *
     * @remarks
     * Only applicable when the element renders as a `<button>`. Setting this to
     * `"button"` prevents the element from submitting forms when clicked.
     *
     * Accepted values: `"button"`
     *
     * @type {'button'}
     * @defaultValue undefined
     * @optional
     */
    type?: 'button'
  }

/**
 * Accepted values for the `as` prop of the {@link Selectable} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Selectable`.
 *
 * Accepted values: `"button"` | `"a"` | `ComponentType`
 *
 * @internal
 */
export type SelectableElementType = 'button' | 'a' | ComponentType

/**
 * Props for the {@link Selectable} component.
 *
 * @remarks
 * Combines {@link SelectableOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<button>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link SelectableElementType}.
 *
 * @internal
 */
export type SelectableProps<E extends SelectableElementType = SelectableElementType> = Props<
  SelectableOwnProps,
  E
>

/**
 * An interactive primitive used as the base element for selectable list items
 * such as {@link MenuItem}, {@link MenuGroup}, and {@link TreeItem}.
 *
 * @remarks
 * The `Selectable` component renders a {@link Box} element with additional
 * interactive styling for hover, focus, active, and selected states. It applies
 * the design system's selectable color treatment based on the `tone` and
 * `selected` props, and delegates all layout and spacing behavior to the
 * underlying `Box`.
 *
 * The `selected` state is reflected via the `data-selected` attribute, which
 * the CSS layer uses to apply the appropriate visual treatment.
 *
 * This component is not intended for direct use by consumers. It is used
 * internally by interactive list-based components.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `SelectableElementType` | `"button"` | No | The HTML element or component type to render. |
 * | `disabled` | `boolean` | `undefined` | No | Disables the element, preventing user interaction. |
 * | `href` | `string` | `undefined` | No | URL for the element when rendered as an anchor. |
 * | `selected` | `boolean` | `undefined` | No | Applies a selected visual state via `data-selected`. |
 * | `tone` | `ElementTone` | `undefined` | No | Sets the color tone for interactive states. Accepted values: `"default"` \| `"neutral"` \| `"primary"` \| `"suggest"` \| `"positive"` \| `"caution"` \| `"critical"`. |
 * | `type` | `'button'` | `undefined` | No | Sets the `type` attribute when rendered as a `<button>`. |
 *
 * @internal
 */
export function Selectable<E extends SelectableElementType = typeof DEFAULT_SELECTABLE_ELEMENT>(
  props: SelectableProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_SELECTABLE_ELEMENT,
    className,
    radius,
    selected,
    tone,
    ...rest
  } = props as SelectableProps<typeof DEFAULT_SELECTABLE_ELEMENT>

  return (
    <Box
      {...rest}
      as={as}
      className={_selectable({className, radius, tone})}
      data-selected={selected ? '' : props['data-selected']}
    />
  )
}
