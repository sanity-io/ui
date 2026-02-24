import {ControlsIcon, MenuIcon} from '@sanity/icons'
import {Box, Button, Flex, Layer, Text, TooltipDelayGroupProvider, useMediaIndex} from '@sanity/ui'

import {useWorkshop} from '../useWorkshop'
import {NavbarBreadcrumbs} from './NavbarBreadcrumbs'
import {OpenCanvasButton} from './OpenCanvasButton'
import {SchemeMenu} from './SchemeMenu'
import {ViewportMenu} from './ViewportMenu'
import {ZoomMenu} from './ZoomMenu'

/** @internal */
export function WorkshopNavbar(props: {
  inspectorExpanded: boolean
  navigatorExpanded: boolean
  onInspectorToggle: () => void
  onNavigatorToggle: () => void
}) {
  const {inspectorExpanded, navigatorExpanded, onInspectorToggle, onNavigatorToggle} = props
  const mediaIndex = useMediaIndex()
  const {story, title} = useWorkshop()

  return (
    <TooltipDelayGroupProvider>
      <Layer
        flex="none"
        padding={3}
        position="relative"
        shadow={1}
        style={{lineHeight: 0}}
        zOffset={100}
      >
        <Flex align="flex-start" gap={1}>
          <Box display={['block', 'block', 'none']} flex="none">
            <Button
              aria-label="Open navigator"
              fontSize={[2, 2, 1]}
              icon={MenuIcon}
              mode="bleed"
              padding={2}
              selected={navigatorExpanded}
              onClick={onNavigatorToggle}
            />
          </Box>

          <Flex
            flex={1}
            justify={['center', 'center', 'flex-start']}
            padding={2}
            sizing="border"
            style={{minWidth: 250}}
          >
            {mediaIndex < 2 && <Text weight="bold">{story?.title ?? title}</Text>}
            {mediaIndex >= 2 && <NavbarBreadcrumbs />}
          </Flex>

          <Box display={['block', 'block', 'none']} flex="none">
            <Button
              aria-label="Open inspector"
              fontSize={[2, 2, 1]}
              icon={ControlsIcon}
              mode="bleed"
              padding={2}
              selected={inspectorExpanded}
              onClick={onInspectorToggle}
            />
          </Box>

          <Box display={['none', 'none', 'flex']} flex="none" gap={2}>
            {/* <Inline gap={1}> */}
            <OpenCanvasButton />
            <ViewportMenu />
            <ZoomMenu />
            <SchemeMenu />
            {/* </Inline> */}
          </Box>
        </Flex>
      </Layer>
    </TooltipDelayGroupProvider>
  )
}
