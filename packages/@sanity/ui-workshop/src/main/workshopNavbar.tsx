import {ControlsIcon, LaunchIcon, MenuIcon, MoonIcon, SelectIcon, SunIcon} from '@sanity/icons'
import {
  Box,
  Breadcrumbs,
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
import React, {useCallback, useMemo} from 'react'
import styled from 'styled-components'
import {useScope} from '../useScope'
import {useWorkshop} from '../useWorkshop'
import {VIEWPORT_OPTIONS, ZOOM_OPTIONS} from './constants'

const Root = styled(Card)`
  line-height: 0;
`

export function WorkshopNavbar(props: {
  scheme: 'light' | 'dark'
  setScheme: (s: 'light' | 'dark') => void
  setViewport: (v: string) => void
  setZoom: (z: number) => void
  viewport: string
  zoom: number
}): React.ReactElement {
  const {scheme, setScheme, setViewport, setZoom, viewport, zoom} = props
  const {pushLocation, scope, story, title, location, frameUrl} = useWorkshop()
  const {value} = useScope()

  const currentFrameUrl = useMemo(
    () =>
      `${frameUrl}?path=${location.path}&scheme=${scheme}&value=${encodeURIComponent(
        JSON.stringify(value)
      )}`,
    [frameUrl, location.path, scheme, value]
  )
  const handleToggleScheme = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      setScheme(target.checked ? 'dark' : 'light')
    },
    [setScheme]
  )

  const handleHomeClick = useCallback(
    (event) => {
      if (event.shiftKey || event.ctrlKey) return
      event.preventDefault()
      pushLocation({path: '/'})
    },
    [pushLocation]
  )

  return useMemo(
    () => (
      <Root borderBottom paddingX={3} paddingY={2}>
        <Flex align="center">
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
            <Breadcrumbs
              separator={
                <Text muted size={1}>
                  /
                </Text>
              }
              space={2}
            >
              <Text size={1} weight="bold">
                <a href="/" onClick={handleHomeClick} style={{color: 'inherit'}}>
                  {title}
                </a>
              </Text>

              {scope && (
                <Text align="center" size={1}>
                  {scope.title}
                </Text>
              )}

              {story && <Text size={1}>{story.title}</Text>}
            </Breadcrumbs>
          </Flex>

          <Box display={['block', 'block', 'none']}>
            <Button fontSize={1} icon={ControlsIcon} mode="bleed" padding={2} />
          </Box>

          <Box display={['none', 'none', 'block']} flex={1}>
            <Flex align="center" justify="flex-end">
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

              <Flex marginLeft={2}>
                <LayerProvider zOffset={100}>
                  <MenuButton
                    button={
                      <Button
                        fontSize={1}
                        iconRight={SelectIcon}
                        mode="ghost"
                        padding={2}
                        style={{minWidth: 80}}
                        text={VIEWPORT_OPTIONS.find((o) => o.name === viewport)?.title}
                      />
                    }
                    id="viewport-menu"
                    menu={
                      <Menu>
                        {VIEWPORT_OPTIONS.map((option) => (
                          <MenuItem
                            fontSize={1}
                            key={option.name}
                            onClick={() => setViewport(option.name)}
                            padding={2}
                            selected={option.name === viewport}
                            text={option.title}
                          />
                        ))}
                      </Menu>
                    }
                    popover={{matchReferenceWidth: true}}
                    portal
                  />
                </LayerProvider>
              </Flex>
              {story && (
                <Box marginLeft={2}>
                  <Button
                    as="a"
                    fontSize={1}
                    href={currentFrameUrl}
                    iconRight={LaunchIcon}
                    mode="ghost"
                    padding={2}
                    rel="noopener noreferrer"
                    target="_blank"
                    text="Open story"
                  />
                </Box>
              )}
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
          </Box>
        </Flex>
      </Root>
    ),
    [
      currentFrameUrl,
      handleHomeClick,
      handleToggleScheme,
      scheme,
      scope,
      setViewport,
      setZoom,
      story,
      title,
      viewport,
      zoom,
    ]
  )
}
