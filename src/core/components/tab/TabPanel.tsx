import {Box, type BoxOwnProps} from '../../primitives/box/Box'
import type {ComponentType, Props} from '../../types'

/** @public */
export const DEFAULT_TAB_PANEL_ELEMENT = 'div'

/** @public */
export type TabPanelOwnProps = BoxOwnProps & {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  'id': string
}

/** @public */
export type TabPanelElementType = 'div' | 'span' | ComponentType

/** @public */
export type TabPanelProps<E extends TabPanelElementType = TabPanelElementType> = Props<
  TabPanelOwnProps,
  E
>

/** @public */
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
