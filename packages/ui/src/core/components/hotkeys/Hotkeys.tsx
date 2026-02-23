import type {GapStyleProps, RadiusStyleProps, ResponsiveProp} from '@sanity/ui/css'
import type {FontTextSize, Space} from '@sanity/ui/theme'

import {Box} from '../../primitives/box/Box'
import {KBD} from '../../primitives/kbd/Kbd'
import type {ComponentType, Props} from '../../types'

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
 * Extends {@link GapStyleProps} and {@link RadiusStyleProps} to provide gap and
 * border-radius control alongside hotkeys-specific properties for rendering
 * keyboard shortcut indicators.
 *
 * Inherited from {@link GapStyleProps}:
 * - `gap` (`ResponsiveProp<Space>`) – Sets the gap between individual key elements. Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`. Default: `1`.
 * - `gapX` (`ResponsiveProp<Space>`) – Sets the horizontal gap between key elements.
 * - `gapY` (`ResponsiveProp<Space>`) – Sets the vertical gap between key elements.
 *
 * Inherited from {@link RadiusStyleProps}:
 * - `radius` (`ResponsiveProp<Radius | 'full'>`) – Sets the border radius of each individual key element. Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | "full"`.
 *
 * @public
 */
export interface HotkeysOwnProps extends GapStyleProps, RadiusStyleProps {
  /**
   * Sets the font size of the key label text inside each {@link KBD} element.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontTextSize\>}
   * @defaultValue undefined
   * @optional
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * Sets the inner padding of each individual {@link KBD} element.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Space\>}
   * @defaultValue undefined
   * @optional
   */
  padding?: ResponsiveProp<Space>

  /**
   * An array of key label strings to render as individual keyboard key indicators.
   *
   * @remarks
   * Each string in the array is rendered inside its own {@link KBD} element.
   * For example, `["Ctrl", "S"]` renders two styled key indicators side by side.
   *
   * When `undefined`, `null`, or an empty array, the component returns `undefined`
   * and renders nothing.
   *
   * @type {string[]}
   * @defaultValue undefined
   * @optional
   */
  keys?: string[]
}

/**
 * Accepted values for the `as` prop of the {@link Hotkeys} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered as the
 * outer wrapper of the `Hotkeys` component.
 *
 * Accepted values: `"kbd"` | `ComponentType`
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
 * Renders a keyboard shortcut as a row of styled {@link KBD} elements,
 * representing each key in the combination.
 *
 * @remarks
 * The `Hotkeys` component maps each entry in the `keys` array to an individual
 * {@link KBD} element, laid out horizontally inside a flex {@link Box}. It is
 * typically used inside {@link MenuItem} components to annotate actions with
 * their keyboard shortcuts, or standalone to document key combinations.
 *
 * When the `keys` prop is `undefined`, `null`, or an empty array, the component
 * returns `undefined` and renders nothing.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `HotkeysElementType` | `"kbd"` | No | The HTML element or component type to render as the outer wrapper. |
 * | `gap` | `ResponsiveProp<Space>` | `1` | No | Gap between individual key elements. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 * | `fontSize` | `ResponsiveProp<FontTextSize>` | `undefined` | No | Font size of each key label. Accepted values: `0 \| 1 \| 2 \| 3 \| 4`. |
 * | `padding` | `ResponsiveProp<Space>` | `undefined` | No | Inner padding of each key element. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 * | `radius` | `ResponsiveProp<Radius \| 'full'>` | `undefined` | No | Border radius of each key element. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| "full"`. |
 * | `keys` | `string[]` | `undefined` | No | The key labels to render. When empty or absent, nothing is rendered. |
 *
 * @public
 */
export function Hotkeys<E extends HotkeysElementType = typeof DEFAULT_HOTKEYS_ELEMENT>(
  props: HotkeysProps<E>,
): React.JSX.Element | undefined {
  const {
    as = DEFAULT_HOTKEYS_ELEMENT,
    fontSize,
    gap = 1,
    gapX,
    gapY,
    keys,
    padding,
    radius,
    ...rest
  } = props as HotkeysProps<typeof DEFAULT_HOTKEYS_ELEMENT>

  if (!keys || keys.length === 0) {
    return undefined
  }

  return (
    <Box as={as} data-ui="Hotkeys" {...rest} display="flex" gap={gap} gapX={gapX} gapY={gapY}>
      {keys.map((key, i) => (
        <KBD fontSize={fontSize} key={i} padding={padding} radius={radius}>
          {key}
        </KBD>
      ))}
    </Box>
  )
}
