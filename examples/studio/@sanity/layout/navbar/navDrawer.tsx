import {useStudioToolPlugins} from '@sanity/base'
import {Avatar, Box, Button, Card, Flex, Stack, Text, Theme} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const Root = styled.div<{open: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  pointer-events: ${({open}) => (open ? 'all' : 'none')};
`

const OverlayBg = styled.div<{open: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${({theme}: {theme: Theme}) =>
    theme.color.light.card.tones.default.enabled.shadow.ambient};
  transition: opacity 200ms;
  opacity: ${({open}) => (open ? 1 : 0)};
`

const DrawerCard = styled(Card)<{open: boolean}>`
  position: relative;
  transform: ${({open}) =>
    open ? `translate3d(0, 0, 0)` : `translate3d(calc(-100% - 1px), 0, 0)`};
  transition: transform 200ms;
  margin-right: 50px;
  height: 100%;
  max-width: ${320 - 50}px;
  box-shadow: 0 0 0 1px
    ${({theme}: {theme: Theme}) => theme.color.light.card.tones.default.enabled.shadow.outline};
`

export function NavDrawer({onHide, open}: {onHide: () => void; open: boolean}) {
  const tools = useStudioToolPlugins()
  const tabIndex = open ? 0 : -1

  return (
    <Root aria-hidden={!open} open={open}>
      <OverlayBg open={open} />
      <DrawerCard open={open}>
        <Flex direction="column" style={{height: '100%'}}>
          <Flex style={{borderBottom: '1px solid var(--card-hairline-soft-color)'}}>
            <Box padding={4} flex={1}>
              <Text>
                <strong>Sanity.io</strong>
              </Text>
            </Box>
            <Box padding={2}>
              <Button icon="close" mode="bleed" onClick={onHide} tabIndex={tabIndex} />
            </Box>
          </Flex>
          <Box flex={1} padding={2} style={{overflow: 'auto'}}>
            <Stack space={2}>
              {tools.map((tool: any) => (
                <Button
                  icon={tool.icon}
                  key={tool.name}
                  mode="bleed"
                  style={{textAlign: 'left'}}
                  tabIndex={tabIndex}
                  text={tool.title}
                />
              ))}
            </Stack>
          </Box>
          <Box padding={4} style={{borderTop: '1px solid var(--card-hairline-soft-color)'}}>
            <Flex align="center">
              <Avatar color="magenta" size={1} />
              <Box flex={1} paddingLeft={2}>
                <Text>
                  <strong style={{fontWeight: 600}}>Marius Lundgård</strong>
                </Text>
              </Box>
              <Box>
                <Button icon="leave" mode="bleed" tabIndex={tabIndex} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </DrawerCard>
    </Root>
  )
}
