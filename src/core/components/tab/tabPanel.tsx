import {ForwardedRef, forwardRef} from 'react'

import {Box, BoxProps} from '../../primitives'
import {Props} from '../../types'

/**
 * @public
 */
export interface TabPanelProps extends BoxProps {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  'id': string
}

/**
 * @public
 */
export const TabPanel = forwardRef(function TabPanel(
  props: Props<TabPanelProps, 'div'>,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const {flex, ...restProps} = props

  return (
    <Box
      data-ui="TabPanel"
      {...restProps}
      flex={flex}
      ref={ref}
      role="tabpanel"
      tabIndex={props.tabIndex === undefined ? 0 : props.tabIndex}
    >
      {props.children}
    </Box>
  )
})

TabPanel.displayName = 'ForwardRef(TabPanel)'
