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
   */
  'aria-controls': string

  /**
   * A unique identifier for the tab element.
   *
   * @remarks
   * Applied as the `id` attribute on the rendered element. This value is
   * referenced by the corresponding {@link TabPanel}'s `aria-labelledby`
   * prop to establish an accessible label relationship.
   */
  id: string

  /**
   * An icon to render inside the tab, on the leading (left) side of the label.
   *
   * @remarks
   * Accepts either a React component type (rendered as `<IconComponent />`) or
   * a React element (rendered as-is). Forwarded to the underlying {@link Button}'s
   * `icon` prop.
   */
  icon?: ElementType | ReactNode

  /**
   * When `true`, programmatically moves focus to this tab element.
   *
   * @remarks
   * Managed internally by {@link TabList} during keyboard navigation. When the
   * value transitions to `true` and the tab does not already have focus, the
   * underlying button element is focused via `element.focus()`.
   */
  focused?: boolean

  /**
   * Sets the font size of the tab's text and icon content.
   *
   * @remarks
   * Uses the text font size scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 1
   */
  fontSize?: ResponsiveProp<FontTextSize>

  /**
   * The text label to display inside the tab.
   *
   * @remarks
   * Forwarded to the underlying {@link Button}'s `text` prop.
   */
  label?: ReactNode

  /**
   * Sets the inner padding of the tab element.
   *
   * @remarks
   * Uses the spacing scale defined by the theme. Supports responsive values.
   *
   * @defaultValue 2
   */
  padding?: ResponsiveProp<Space>

  /**
   * When `true`, marks this tab as the currently active tab in the tab set.
   *
   * @remarks
   * Sets `aria-selected="true"` on the rendered element and applies a selected
   * visual state via the underlying {@link Button}. Only the selected tab is
   * included in the tab order (`tabIndex={0}`); all other tabs have
   * `tabIndex={-1}`.
   */
  selected?: boolean

  /**
   * Sets the color tone of the tab.
   *
   * @remarks
   * Controls the color scheme applied to the tab's hover, focus, and selected states.
   */
  tone?: ElementTone
}

/**
 * Accepted values for the `as` prop of the {@link Tab} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `Tab`.
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
