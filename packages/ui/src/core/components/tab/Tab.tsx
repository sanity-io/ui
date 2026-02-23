import type {ResponsiveProp} from '@sanity/ui/css'
import type {ElementTone, FontTextSize, Space} from '@sanity/ui/theme'
import {
  type ElementType,
  type FocusEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import {Button} from '../../primitives/button/Button'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link Tab} component.
 *
 * @public
 */
export const DEFAULT_TAB_ELEMENT = 'button'

/**
 * Own props for the {@link Tab} component.
 *
 * @remarks
 * Defines the configuration for rendering a single tab within a {@link TabList}.
 * The `Tab` component renders a {@link Button} internally with `mode="bleed"`
 * and `role="tab"`.
 *
 * @public
 */
export type TabOwnProps = {
  /**
   * The `id` of the corresponding {@link TabPanel} component that this tab controls.
   *
   * @remarks
   * Sets the `aria-controls` attribute on the rendered tab element, establishing
   * an accessible relationship between the tab and its associated panel.
   *
   * @type {string}
   * @required
   */
  'aria-controls': string

  /**
   * A unique identifier for the tab element.
   *
   * @remarks
   * Applied as the `id` attribute on the rendered element. This value is
   * referenced by the corresponding {@link TabPanel}'s `aria-labelledby`
   * prop to establish an accessible label relationship.
   *
   * @type {string}
   * @required
   */
  'id': string

  /**
   * An icon to render inside the tab, on the leading (left) side of the label.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is). Forwarded to the underlying {@link Button}'s
   * `icon` prop.
   *
   * @type {ElementType | ReactNode}
   * @defaultValue undefined
   * @optional
   */
  'icon'?: ElementType | ReactNode

  /**
   * When `true`, programmatically moves focus to this tab element.
   *
   * @remarks
   * Managed internally by {@link TabList} during keyboard navigation. When the
   * value transitions to `true` and the tab does not already have focus, the
   * underlying button element is focused via `element.focus()`.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  'focused'?: boolean

  /**
   * Sets the font size of the tab's text and icon content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4`
   *
   * @type {ResponsiveProp\<FontTextSize\>}
   * @defaultValue 1
   * @optional
   */
  'fontSize'?: ResponsiveProp<FontTextSize>

  /**
   * The text label to display inside the tab.
   *
   * @remarks
   * Forwarded to the underlying {@link Button}'s `text` prop.
   *
   * @type {ReactNode}
   * @defaultValue undefined
   * @optional
   */
  'label'?: ReactNode

  /**
   * Sets the inner padding of the tab element.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * Accepted values: `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9`
   *
   * @type {ResponsiveProp\<Space\>}
   * @defaultValue 2
   * @optional
   */
  'padding'?: ResponsiveProp<Space>

  /**
   * When `true`, marks this tab as the currently active tab in the tab set.
   *
   * @remarks
   * Sets `aria-selected="true"` on the rendered element and applies a selected
   * visual state via the underlying {@link Button}. Only the selected tab is
   * included in the tab order (`tabIndex={0}`); all other tabs have
   * `tabIndex={-1}`.
   *
   * @type {boolean}
   * @defaultValue undefined
   * @optional
   */
  'selected'?: boolean

  /**
   * Sets the color tone of the tab.
   *
   * @remarks
   * Controls the color scheme applied to the tab's hover, focus, and selected states.
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
  'tone'?: ElementTone
}

/**
 * Accepted values for the `as` prop of the {@link Tab} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Tab`.
 *
 * Accepted values: `"button"` | `ComponentType`
 *
 * @public
 */
export type TabElementType = 'button' | ComponentType

/**
 * Props for the {@link Tab} component.
 *
 * @remarks
 * Combines {@link TabOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<button>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabElementType}.
 *
 * @public
 */
export type TabProps<E extends TabElementType = TabElementType> = Props<TabOwnProps, E>

/**
 * A single tab element within a {@link TabList}, following the WAI-ARIA Tabs pattern.
 *
 * @remarks
 * The `Tab` component renders a {@link Button} with `mode="bleed"` and `role="tab"`.
 * It manages focus behavior for keyboard navigation (delegated by {@link TabList})
 * and sets `aria-selected` based on the `selected` prop.
 *
 * Only the currently selected tab is included in the document tab order
 * (`tabIndex={0}`); all other tabs are removed from the tab order (`tabIndex={-1}`)
 * and navigable only via the ArrowLeft/ArrowRight keys handled by {@link TabList}.
 *
 * ### Default prop values
 *
 * | Prop | Type | Default | Required | Description |
 * |------|------|---------|----------|-------------|
 * | `as` | `TabElementType` | `"button"` | No | The HTML element or component type to render. |
 * | `aria-controls` | `string` | — | Yes | The `id` of the corresponding `TabPanel`. |
 * | `id` | `string` | — | Yes | A unique identifier for the tab element. |
 * | `fontSize` | `ResponsiveProp<FontTextSize>` | `1` | No | Font size of the tab text. Accepted values: `0 \| 1 \| 2 \| 3 \| 4`. |
 * | `padding` | `ResponsiveProp<Space>` | `2` | No | Inner padding. Accepted values: `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 \| 9`. |
 * | `icon` | `ElementType \| ReactNode` | `undefined` | No | An icon rendered on the leading side. |
 * | `label` | `ReactNode` | `undefined` | No | The text label displayed inside the tab. |
 * | `focused` | `boolean` | `undefined` | No | When `true`, programmatically focuses this tab. |
 * | `selected` | `boolean` | `undefined` | No | When `true`, marks this tab as the active tab. |
 * | `tone` | `ElementTone` | `undefined` | No | Sets the color tone for interactive states. |
 *
 * @public
 */
export function Tab<E extends TabElementType = typeof DEFAULT_TAB_ELEMENT>(
  props: TabProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_ELEMENT,
    icon,
    id,
    focused,
    fontSize = 1,
    label,
    onClick,
    onFocus,
    padding = 2,
    ref: forwardedRef,
    selected,
    ...rest
  } = props as TabProps<typeof DEFAULT_TAB_ELEMENT>

  const ref = useRef<HTMLButtonElement | null>(null)
  const focusedRef = useRef(false)

  useImperativeHandle<HTMLButtonElement | null, HTMLButtonElement | null>(
    forwardedRef,
    () => ref.current,
  )

  const handleBlur = useCallback(() => {
    focusedRef.current = false
  }, [])

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLButtonElement>) => {
      focusedRef.current = true
      if (onFocus) onFocus(event)
    },
    [onFocus],
  )

  useEffect(() => {
    if (focused && !focusedRef.current) {
      if (ref.current) ref.current.focus()
      focusedRef.current = true
    }
  }, [focused])

  return (
    <Button
      data-ui="Tab"
      {...rest}
      aria-selected={selected ? 'true' : 'false'}
      as={as}
      fontSize={fontSize}
      icon={icon}
      id={id}
      mode="bleed"
      onClick={onClick}
      onBlur={handleBlur}
      onFocus={handleFocus}
      padding={padding}
      ref={ref}
      role="tab"
      selected={selected}
      tabIndex={selected ? 0 : -1}
      text={label}
      type="button"
    />
  )
}
