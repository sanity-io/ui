import {Box, BoxOwnProps} from '../../primitives'
import {ComponentType, Props} from '../../types'

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
) {
  const {as = DEFAULT_TAB_PANEL_ELEMENT, ...rest} = props as TabPanelProps<
    typeof DEFAULT_TAB_PANEL_ELEMENT
  >

  return (
    <Box
      data-ui="TabPanel"
      {...rest}
      as={as}
      role="tabpanel"
      tabIndex={props.tabIndex === undefined ? 0 : props.tabIndex}
    >
      {props.children}
    </Box>
  )
}

TabPanel.displayName = 'TabPanel'
