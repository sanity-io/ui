import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {selectable, SELECTABLE_STYLE_PROP_KEYS, type SelectableStyleProps} from '@sanity/ui/css'

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
 * Extends {@link SelectableStyleProps} to provide visual styling props such as
 * `mode`, `tone`, and `radius`.
 *
 * @internal
 */
export interface SelectableOwnProps extends SelectableStyleProps {
  /**
   * When `true`, applies a selected visual state to the element.
   */
  selected?: boolean
}

/**
 * Accepted values for the `as` prop of the {@link Selectable} component.
 *
 * @internal
 */
export type SelectableElementType = 'a' | 'button' | 'span' | ComponentType

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
 * A low-level interactive element that supports selectable/pressable visual states.
 *
 * @remarks
 * `Selectable` is an internal building block used by higher-level components
 * such as {@link MenuItem} and {@link TreeItem} to provide consistent
 * interactive styling.
 *
 * @internal
 */
export function Selectable<E extends SelectableElementType = typeof DEFAULT_SELECTABLE_ELEMENT>(
  props: SelectableProps<E>,
): React.JSX.Element {
  const [
    styleProps,
    {
      as: Element = DEFAULT_SELECTABLE_ELEMENT,
      children,
      selected,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(
    props as SelectableProps<typeof DEFAULT_SELECTABLE_ELEMENT>,
    SELECTABLE_STYLE_PROP_KEYS,
  )

  return (
    <Element
      data-ui="Selectable"
      {...domProps}
      className={selectable(styleProps)}
      data-pressed={selected ? '' : props['data-pressed']}
    >
      {children}
    </Element>
  )
}
