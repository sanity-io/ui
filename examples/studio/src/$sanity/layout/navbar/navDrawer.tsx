import {CloseIcon, LeaveIcon} from '@sanity/icons'
import {Avatar, Box, Button, Card, Flex, Layer, Stack, Text, Theme} from '@sanity/ui'
import styled from 'styled-components'
import {useStudioToolPlugins} from '$sanity/base'

const Root = styled(Layer)<{open: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: ${({open}) => (open ? 'all' : 'none')};
`

const OverlayBg = styled.div<{open: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 200ms;
  opacity: ${({open}) => (open ? 1 : 0)};
  background-color: ${({theme}: {theme: Theme}) => theme.sanity.color.base.shadow.ambient};
`

const DrawerCard = styled(Card)<{open: boolean}>`
  position: relative;
  transform: ${({open}) =>
    open ? `translate3d(0, 0, 0)` : `translate3d(calc(-100% - 1px), 0, 0)`};
  transition: transform 200ms;
  margin-right: 50px;
  height: 100%;
  max-width: ${320 - 50}px;
  box-shadow: 0 0 0 1px ${({theme}: {theme: Theme}) => theme.sanity.color.base.shadow.outline};
`

export function NavDrawer({onHide, open}: {onHide: () => void; open: boolean}) {
  const tools = useStudioToolPlugins()
  const tabIndex = open ? 0 : -1

  return (
    <Root aria-hidden={!open} open={open}>
      <OverlayBg open={open} />
      <DrawerCard open={open}>
        <Flex direction="column" height="fill">
          <Card borderBottom>
            <Flex>
              <Box padding={4} flex={1}>
                <Text>
                  <strong>Sanity.io</strong>
                </Text>
              </Box>
              <Box padding={2}>
                <Button icon={CloseIcon} mode="bleed" onClick={onHide} tabIndex={tabIndex} />
              </Box>
            </Flex>
          </Card>
          <Box flex={1} padding={2} style={{overflow: 'auto'}}>
            <Stack space={2}>
              {tools.map((tool: any) => (
                <Button
                  icon={tool.icon}
                  justify="flex-start"
                  key={tool.name}
                  mode="bleed"
                  paddingX={4}
                  paddingY={3}
                  style={{textAlign: 'left'}}
                  tabIndex={tabIndex}
                  text={tool.title}
                />
              ))}
            </Stack>
          </Box>
          <Card borderTop padding={2}>
            <Flex align="center">
              <Avatar color="magenta" size={1} />
              <Box flex={1} paddingLeft={2}>
                <Text>
                  <strong style={{fontWeight: 600}}>Doug Engelbart</strong>
                </Text>
              </Box>
              <Box>
                <Button icon={LeaveIcon} mode="bleed" tabIndex={tabIndex} />
              </Box>
            </Flex>
          </Card>
        </Flex>
      </DrawerCard>
    </Root>
  )
}
