import {Box, BoxOwnProps} from '../../primitives/box/box'

/**
 * @public
 */
export interface TabPanelProps extends BoxOwnProps {
  /**
   * The `id` of the correlating `Tab` component.
   */
  'aria-labelledby': string
  'id': string
}

/**
 * @public
 */
export const TabPanel = function TabPanel(
  props: TabPanelProps &
    Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'aria-labelledby' | 'id' | 'role'>,
) {
  const {flex, ...restProps} = props

  return (
    <Box
      data-ui="TabPanel"
      {...restProps}
      flex={flex}
      role="tabpanel"
      tabIndex={props.tabIndex === undefined ? 0 : props.tabIndex}
    >
      {props.children}
    </Box>
  )
}
