import {_splitKeys, type ComponentType, type Props} from '@sanity/ui/core'
import {hotkeys, HOTKEYS_STYLE_PROP_KEYS, type HotkeysStyleProps} from '@sanity/ui/css'
import {KBD} from '@sanity/ui/primitives/kbd'

/**
 * The default HTML element type rendered by the {@link Hotkeys} component.
 *
 * @public
 */
export const DEFAULT_HOTKEYS_ELEMENT = 'kbd'

/**
 * Own props for the {@link Hotkeys} component.
 *
 * @remarks
 * Extends {@link HotkeysStyleProps} to provide visual styling for the
 * keyboard shortcut display.
 *
 * @public
 */
export interface HotkeysOwnProps extends HotkeysStyleProps {
  /** @deprecated No longer supported. */
  fontSize?: never

  /**
   * An array of key labels to display, each rendered as an individual
   * {@link KBD} element.
   */
  keys: string[]
}

/**
 * Accepted values for the `as` prop of the {@link Hotkeys} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Hotkeys`.
 *
 * @public
 */
export type HotkeysElementType = 'kbd' | ComponentType

/**
 * Props for the {@link Hotkeys} component.
 *
 * @remarks
 * Combines {@link HotkeysOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<kbd>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link HotkeysElementType}.
 *
 * @public
 */
export type HotkeysProps<E extends HotkeysElementType = HotkeysElementType> = Props<
  HotkeysOwnProps,
  E
>

/**
 * The `Hotkeys` component renders a keyboard shortcut combination as a
 * series of semantic {@link KBD} elements.
 *
 * @remarks
 * Each entry in the `keys` array is rendered as an individual `<kbd>` element,
 * making the shortcut accessible and visually styled by the theme.
 *
 * @public
 */
export function Hotkeys<E extends HotkeysElementType = typeof DEFAULT_HOTKEYS_ELEMENT>(
  props: HotkeysProps<E>,
): React.JSX.Element | undefined {
  const [
    styleProps,
    {
      as: Element = DEFAULT_HOTKEYS_ELEMENT,
      fontSize: _fontSize,
      keys,
      // split DOM props
      ...domProps
    },
  ] = _splitKeys(props as HotkeysProps<typeof DEFAULT_HOTKEYS_ELEMENT>, HOTKEYS_STYLE_PROP_KEYS)

  if (!keys || keys.length === 0) {
    return undefined
  }

  return (
    <Element data-ui="Hotkeys" {...domProps} className={hotkeys(styleProps)}>
      {keys.map((key, i) => (
        <KBD key={i}>{key}</KBD>
      ))}
    </Element>
  )
}
