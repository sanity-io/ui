import {MoonIcon, SelectIcon, SunIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Switch,
  Text,
} from '@sanity/ui'
import React, {useCallback} from 'react'
import {useWorkshop} from '../useWorkshop'
import {VIEWPORT_OPTIONS, ZOOM_OPTIONS} from './constants'

export function WorkshopNavbar(props: {
  scheme: 'light' | 'dark'
  setScheme: (s: 'light' | 'dark') => void
  setViewport: (v: number | 'auto') => void
  setZoom: (z: number) => void
  viewport: number | 'auto'
  zoom: number
}): React.ReactElement {
  const {scheme, setScheme, setViewport, setZoom, viewport, zoom} = props
  const {scope, story, title} = useWorkshop()

  const handleToggleScheme = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      setScheme(target.checked ? 'dark' : 'light')
    },
    [setScheme]
  )

  return (
    <Card borderBottom paddingX={3} paddingY={2}>
      <Flex align="center" style={{lineHeight: 0}}>
        <Box flex={1} style={{minWidth: 250}}>
          <Box padding={2}>
            <Text size={1} weight="bold">
              {title}
            </Text>
          </Box>
        </Box>
        <Box flex={3} paddingX={3}>
          <Text align="center" size={1} textOverflow="ellipsis">
            {scope && <strong>{scope.title}</strong>}
            {scope && story && <> / {story.title}</>}
          </Text>
        </Box>
        <Flex align="center" justify="flex-end" flex={1} style={{minWidth: 250}}>
          <LayerProvider zOffset={100}>
            <MenuButton
              button={
                <Button
                  fontSize={1}
                  iconRight={SelectIcon}
                  mode="ghost"
                  padding={2}
                  style={{minWidth: 80}}
                  text={ZOOM_OPTIONS.find((o) => o.value === zoom)?.title}
                />
              }
              id="zoom-menu"
              menu={
                <Menu>
                  {ZOOM_OPTIONS.map((option) => (
                    <MenuItem
                      fontSize={1}
                      key={option.value}
                      onClick={() => setZoom(option.value)}
                      padding={2}
                      selected={option.value === zoom}
                      text={option.title}
                    />
                  ))}
                </Menu>
              }
              popover={{matchReferenceWidth: true}}
              portal
            />
          </LayerProvider>

          <Box marginLeft={2}>
            <LayerProvider zOffset={100}>
              <MenuButton
                button={
                  <Button
                    fontSize={1}
                    iconRight={SelectIcon}
                    mode="ghost"
                    padding={2}
                    style={{minWidth: 80}}
                    text={VIEWPORT_OPTIONS.find((o) => o.value === viewport)?.title}
                  />
                }
                id="viewport-menu"
                menu={
                  <Menu>
                    {VIEWPORT_OPTIONS.map((option) => (
                      <MenuItem
                        fontSize={1}
                        key={option.value}
                        onClick={() => setViewport(option.value)}
                        padding={2}
                        selected={option.value === viewport}
                        text={option.title}
                      />
                    ))}
                  </Menu>
                }
                popover={{matchReferenceWidth: true}}
                portal
              />
            </LayerProvider>
          </Box>
          <Box marginLeft={2}>
            <Button as="label" mode="bleed" padding={2}>
              <Flex align="center">
                <Box marginRight={2}>
                  <Text size={1}>
                    <SunIcon />
                  </Text>
                </Box>
                <Box style={{margin: '-4px 0'}}>
                  <Switch checked={scheme === 'dark'} onChange={handleToggleScheme} />
                </Box>
                <Box marginLeft={2}>
                  <Text size={1}>
                    <MoonIcon />
                  </Text>
                </Box>
              </Flex>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}
