import {ControlsIcon, MenuIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Inline, Text, useMediaIndex} from '@sanity/ui'
import {memo} from 'react'

import {useWorkshop} from '../useWorkshop'
import {NavbarBreadcrumbs} from './NavbarBreadcrumbs'
import {OpenCanvasButton} from './OpenCanvasButton'
import {SchemeMenu} from './SchemeMenu'
import {ViewportMenu} from './ViewportMenu'
import {ZoomMenu} from './ZoomMenu'

/** @internal */
export const WorkshopNavbar = memo(function WorkshopNavbar(props: {
  inspectorExpanded: boolean
  navigatorExpanded: boolean
  onInspectorToggle: () => void
  onNavigatorToggle: () => void
}): React.ReactNode {
  const {inspectorExpanded, navigatorExpanded, onInspectorToggle, onNavigatorToggle} = props
  const mediaIndex = useMediaIndex()
  const {story, title} = useWorkshop()

  return (
    <Card borderBottom flex="none" padding={2} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box display={['block', 'block', 'none']} flex="none">
          <Button
            aria-label="Open navigator"
            fontSize={[2, 2, 1]}
            icon={MenuIcon}
            mode="bleed"
            onClick={onNavigatorToggle}
            padding={2}
            selected={navigatorExpanded}
          />
        </Box>

        <Flex
          flex={1}
          justify={['center', 'center', 'flex-start']}
          padding={2}
          sizing="border"
          style={{minWidth: 250}}
        >
          {mediaIndex < 2 && <Text weight="bold">{story?.title || title}</Text>}
          {mediaIndex >= 2 && <NavbarBreadcrumbs />}
        </Flex>

        <Box display={['block', 'block', 'none']} flex="none">
          <Button
            aria-label="Open inspector"
            fontSize={[2, 2, 1]}
            icon={ControlsIcon}
            mode="bleed"
            onClick={onInspectorToggle}
            padding={2}
            selected={inspectorExpanded}
          />
        </Box>

        <Box display={['none', 'none', 'block']} flex="none">
          <Inline space={1}>
            <OpenCanvasButton />
            <ViewportMenu />
            <ZoomMenu />
            <SchemeMenu />
          </Inline>
        </Box>
      </Flex>
    </Card>
  )
})
