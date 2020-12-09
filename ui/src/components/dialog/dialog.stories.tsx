import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Dialog,
  DialogProps,
  Layer,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Text,
  useLayer,
} from '@sanity/ui'
import {action} from '@storybook/addon-actions'
import {boolean, select, text, withKnobs} from '@storybook/addon-knobs'
import React, {useCallback, useEffect, useRef, useState} from 'react'

export default {
  decorators: [withKnobs],
  title: 'Components/Dialog',
}

export const props = () => {
  const header = text('Header', 'Props example', 'Props')

  const width = select(
    'Width',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      Auto: 'auto',
    },
    0,
    'Props'
  )

  return (
    <LayerProvider>
      <PropsExample header={header} width={width} />
    </LayerProvider>
  )
}

export const nested = () => {
  return (
    <LayerProvider>
      <NestedExample />
    </LayerProvider>
  )
}

export const onScroll = () => {
  return (
    <LayerProvider>
      <OnScrollExample />
    </LayerProvider>
  )
}

export const layering = () => {
  return (
    <LayerProvider>
      <Layer zOffset={10} id="a">
        <Card padding={2} shadow={2}>
          <DebugLayer />
        </Card>
      </Layer>
      <Layer zOffset={10} id="b">
        <Card padding={2} shadow={2}>
          <DebugLayer />
        </Card>
      </Layer>
      <LayerProvider zOffset={100}>
        <Dialog header="Layering example" id="layering-example" onClose={action('onEscape')}>
          <Box padding={4}>
            <DebugLayer />
          </Box>
        </Dialog>
      </LayerProvider>
    </LayerProvider>
  )
}

function DebugLayer() {
  const layer = useLayer()

  return <Code language="json">{JSON.stringify(layer, null, 2)}</Code>
}

export const position = () => {
  const open = boolean('Open', false, 'Props')
  const position = select('Position', ['fixed', 'absolute'], 'fixed', 'Props')

  return (
    <Box padding={4}>
      <Box style={{padding: 'calc(100vh - 100px) 0'}}>
        <Stack space={3}>
          <Text align="center">
            <ArrowUpIcon />
          </Text>
          <Text align="center">Scrollable</Text>
          <Text align="center">
            <ArrowDownIcon />
          </Text>
        </Stack>

        <LayerProvider>
          {open && <Dialog header="Position example" id="position-example" position={position} />}
        </LayerProvider>
      </Box>
    </Box>
  )
}

function PropsExample(props: Omit<DialogProps, 'id' | 'onClose'>) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <Box padding={4}>
      <Button
        id="open-dialog-button"
        onClick={() => setOpen(true)}
        ref={buttonRef}
        text="Open dialog"
      />

      {open && (
        <Dialog {...props} id="dialog" onClose={handleClose}>
          <Box padding={4}>
            <Stack space={4}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                aliquet imperdiet.
              </Text>
              <Button id="button-1" text="Focus test" />
              <Text>
                Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum mollis
                dolor.
              </Text>
              <Button id="button-2" text="Focus test" />
              <Text>
                Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris dignissim,
                mollis enim.
              </Text>
              <Button id="button-3" text="Focus test" />
              <Text>Cras quis elit non mauris faucibus molestie non non augue. </Text>
              <Text>
                Proin suscipit gravida sodales. Morbi vel purus molestie, rhoncus augue sit amet,
                auctor justo.
              </Text>
              <Button id="button-4" text="Focus test" />
              <Text>Proin lobortis nunc a tellus condimentum, a ultrices arcu egestas.</Text>
              <Button id="button-5" text="Focus test" />
              <Text>
                Suspendisse augue nibh, euismod sit amet sapien nec, molestie dignissim magna.
              </Text>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Box>
  )
}

function NestedExample() {
  const [open1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <>
      {open1 && (
        <Dialog cardShadow={0} id="dialog1">
          <Box padding={4}>
            <Button onClick={() => setOpen2(true)} text="Open Dialog 2" />
          </Box>

          {open2 && (
            <Dialog cardShadow={2} id="dialog2" onClose={() => setOpen2(false)}>
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)} text="Open Dialog 3" />
              </Box>

              {open3 && (
                <Dialog cardShadow={4} id="dialog3" onClose={() => setOpen3(false)}>
                  <Box padding={4}>
                    <MenuButton
                      button={<Button text="Test" />}
                      id="menu3"
                      menu={
                        <Menu>
                          <MenuItem text="Test" />
                          <MenuItem text="Test" />
                        </Menu>
                      }
                    />
                  </Box>
                </Dialog>
              )}
            </Dialog>
          )}
        </Dialog>
      )}
    </>
  )
}

function OnScrollExample() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current

    if (!el) return

    const handleScroll = action('scroll')

    el.addEventListener('scroll', handleScroll, {passive: true})

    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Dialog contentRef={ref} header="On scroll example" id="on-scroll-example">
      <Box padding={4}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
          hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi
          imperdiet quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis,
          ex quam luctus felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at
          rhoncus a, tempus vel neque. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Sed id mauris quam. Nam finibus sapien non lacinia
          ultricies. Integer fermentum tortor at pellentesque faucibus. In venenatis commodo
          placerat. Curabitur commodo tortor libero, vel pellentesque elit luctus sodales. Donec
          mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat arcu.
          Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
        </Text>
      </Box>
    </Dialog>
  )
}
