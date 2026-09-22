import {Box, Flex, Layer} from '@sanity/ui'
import {type ActiveToolLayoutProps} from 'sanity'

import {useThemer} from './context'
import {ThemerSidebar} from './ThemerSidebar'

/**
 * Narrow enough to leave the studio preview as much room as possible: the
 * themes stack in a single column of preview cards, the editor fits a swatch
 * next to its label, and the code snippet lives in a dialog rather than the
 * sidebar.
 */
const sidebarStyle: React.CSSProperties = {
  width: 200,
  flex: 'none',
  borderLeft: '1px solid var(--card-border-color)',
  boxSizing: 'border-box',
  overflow: 'hidden',
}

/**
 * Renders the themer sidebar next to the active tool, so the user can browse
 * around their own studio while tweaking the theme.
 *
 * @internal
 */
export function ThemerActiveToolLayout(props: ActiveToolLayoutProps) {
  const {open} = useThemer()

  return (
    <Flex height="fill" sizing="border">
      <Box flex={1} height="fill" overflow="auto">
        {props.renderDefault(props)}
      </Box>

      {open && (
        <Layer height="fill" style={sidebarStyle} zOffset={100}>
          <ThemerSidebar />
        </Layer>
      )}
    </Flex>
  )
}
