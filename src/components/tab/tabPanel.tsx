import React, {forwardRef} from 'react'
import {Box, BoxProps} from '../../primitives'

/**
 * @public
 */
export interface TabPanelProps extends BoxProps {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  id: string
}

/**
 * @public
 */
export const TabPanel = forwardRef(
  (
    props: TabPanelProps & Omit<React.HTMLProps<HTMLDivElement>, 'aria-labelledby' | 'id' | 'role'>,
    ref
  ) => {
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
  }
)

TabPanel.displayName = 'TabPanel'
