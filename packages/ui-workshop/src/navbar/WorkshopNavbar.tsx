import {ControlsIcon, MenuIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Inline} from '@sanity/ui'
import {memo} from 'react'
import {NavbarBreadcrumbs} from './NavbarBreadcrumbs'
import {OpenCanvasButton} from './OpenCanvasButton'
import {SchemeMenu} from './SchemeMenu'
import {ViewportMenu} from './ViewportMenu'
import {ZoomMenu} from './ZoomMenu'

/** @internal */
export const WorkshopNavbar = memo(function WorkshopNavbar(): React.ReactElement {
  return (
    <Card borderBottom flex="none" padding={2} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box display={['block', 'block', 'none']}>
          <Button fontSize={1} icon={MenuIcon} mode="bleed" padding={2} />
        </Box>

        <Flex
          flex={1}
          justify={['center', 'center', 'flex-start']}
          padding={2}
          sizing="border"
          style={{minWidth: 250}}
        >
          <NavbarBreadcrumbs />
        </Flex>

        <Box display={['block', 'block', 'none']}>
          <Button fontSize={1} icon={ControlsIcon} mode="bleed" padding={2} />
        </Box>

        <Box display={['none', 'none', 'block']}>
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
