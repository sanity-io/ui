import {Box, type BoxOwnProps} from '../../primitives/box/Box'
import type {ComponentType, Props} from '../../types'

/**
 * The default HTML element type rendered by the {@link TabPanel} component.
 *
 * @public
 */
export const DEFAULT_TAB_PANEL_ELEMENT = 'div'

/**
 * Own props for the {@link TabPanel} component.
 *
 * @remarks
 * Extends {@link BoxOwnProps} to inherit all Box layout and style props, and adds
 * required accessibility props for associating the panel with its corresponding
 * {@link Tab} element.
 *
 * @public
 */
export type TabPanelOwnProps = BoxOwnProps & {
  /**
   * The `id` of the correlating {@link Tab} component that controls this panel.
   *
   * @remarks
   * Sets the `aria-labelledby` attribute on the rendered element, establishing
   * an accessible label relationship between the tab panel and its controlling
   * tab. This value must match the `id` prop of the corresponding `Tab`.
   */
  'aria-labelledby': string

  /**
   * A unique identifier for the tab panel element.
   *
   * @remarks
   * Applied as the `id` attribute on the rendered element. This value must
   * match the `aria-controls` prop of the corresponding {@link Tab} component
   * to establish the accessibility relationship.
   */
  id: string
}

/**
 * Accepted values for the `as` prop of the {@link TabPanel} component.
 *
 * @remarks
 * Determines the HTML element or custom component type rendered by `TabPanel`.
 *
 * @public
 */
export type TabPanelElementType = 'div' | 'span' | ComponentType

/**
 * Props for the {@link TabPanel} component.
 *
 * @remarks
 * Combines {@link TabPanelOwnProps} with the intrinsic HTML attributes of the
 * element type specified by the `as` prop. When `as` is not provided,
 * the component renders a `<div>` element by default.
 *
 * @typeParam E - The HTML element or component type to render. Defaults to {@link TabPanelElementType}.
 *
 * @public
 */
export type TabPanelProps<E extends TabPanelElementType = TabPanelElementType> = Props<
  TabPanelOwnProps,
  E
>

/**
 * A content panel associated with a {@link Tab} element, displayed when
 * its corresponding tab is selected.
 *
 * @remarks
 * The `TabPanel` component renders a {@link Box} element with `role="tabpanel"`
 * and a default `tabIndex` of `0` (making it focusable) to follow the WAI-ARIA
 * Tabs pattern. It must be paired with a corresponding {@link Tab} via matching
 * `id` / `aria-controls` and `aria-labelledby` / `id` attributes.
 *
 * The panel inherits all layout and visual style props from {@link BoxOwnProps}.
 *
 * @public
 */
export function TabPanel<E extends TabPanelElementType = typeof DEFAULT_TAB_PANEL_ELEMENT>(
  props: TabPanelProps<E>,
): React.JSX.Element {
  const {
    as = DEFAULT_TAB_PANEL_ELEMENT,
    children,
    tabIndex,
    ...rest
  } = props as TabPanelProps<typeof DEFAULT_TAB_PANEL_ELEMENT>

  return (
    <Box
      data-ui="TabPanel"
      {...rest}
      as={as}
      role="tabpanel"
      tabIndex={tabIndex === undefined ? 0 : tabIndex}
    >
      {children}
    </Box>
  )
}
