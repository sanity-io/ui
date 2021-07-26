import {ArrowDownIcon, ArrowUpIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Dialog,
  DialogPosition,
  DialogProvider,
  Layer,
  LayerProvider,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
  Text,
  useLayer,
} from '@sanity/ui'
import {defineScope, useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useEffect, useRef, useState} from 'react'

export default defineScope('components/dialog', 'Dialog', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'nested', title: 'Nested', component: NestedStory},
  {name: 'on-scroll', title: 'On scroll', component: OnScrollStory},
  {name: 'layering', title: 'Layering', component: LayeringStory},
  {name: 'position', title: 'Position', component: PositionStory},
  {name: 'provider', title: 'Provider', component: ProviderStory},
  {name: 'auto-focus', title: 'AutoFocus', component: AutoFocusStory},
])

const WIDTH_OPTIONS: {[key: string]: number | 'auto'} = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  Auto: 'auto',
}

const DIALOG_POSITION_OPTIONS: {[key: string]: DialogPosition} = {
  Fixed: 'fixed',
  Absolute: 'absolute',
}

function DebugLayer() {
  const layer = useLayer()

  return <Code language="json">{JSON.stringify(layer, null, 2)}</Code>
}

function PropsStory() {
  const header = useText('Header', 'Props example', 'Props')
  const onClickOutside = useBoolean('Close when click outside', false, 'Props') || false
  const hideCloseButton = useBoolean('Hide close button', false, 'Props') || false
  const width = useSelect('Width', WIDTH_OPTIONS, 0, 'Props')
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const handleClose = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  return (
    <LayerProvider>
      <Box padding={[4, 5, 6]}>
        <Button
          id="open-dialog-button"
          onClick={() => setOpen(true)}
          ref={buttonRef}
          text="Open dialog"
        />

        {open && (
          <Dialog
            __unstable_hideCloseButton={hideCloseButton}
            header={header}
            id="dialog"
            onClickOutside={onClickOutside ? handleClose : undefined}
            onClose={handleClose}
            open={open}
            width={width}
          >
            <Box padding={4}>
              <Stack space={4}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et orci vitae diam
                  aliquet imperdiet.
                </Text>
                <Button id="button-1" text="Focus test" />
                <Text>
                  Sed in hendrerit metus. Sed sapien neque, imperdiet eu justo sed, vestibulum
                  mollis dolor.
                </Text>
                <Button id="button-2" text="Focus test" />
                <Text>
                  Nulla sit amet ipsum ligula. Duis sit amet velit tempor, ultricies mauris
                  dignissim, mollis enim.
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
    </LayerProvider>
  )
}

function NestedStory() {
  const [open1] = useState(true)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)

  return (
    <LayerProvider>
      {open1 && (
        <Dialog cardShadow={1} header="Dialog 1" id="dialog1">
          <Box padding={4}>
            <Button onClick={() => setOpen2(true)} text="Open Dialog 2" />
          </Box>

          {open2 && (
            <Dialog cardShadow={2} header="Dialog 2" id="dialog2" onClose={() => setOpen2(false)}>
              <Box padding={4}>
                <Button onClick={() => setOpen3(true)} text="Open Dialog 3" />
              </Box>

              {open3 && (
                <Dialog
                  cardShadow={4}
                  header="Dialog 3"
                  id="dialog3"
                  onClose={() => setOpen3(false)}
                >
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
                      portal
                    />
                  </Box>
                </Dialog>
              )}
            </Dialog>
          )}
        </Dialog>
      )}
    </LayerProvider>
  )
}

function OnScrollStory() {
  const ref = useRef<HTMLDivElement | null>(null)
  const handleScroll = useAction('scroll')

  useEffect(() => {
    const el = ref.current

    if (!el) return

    el.addEventListener('scroll', handleScroll, {passive: true})

    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <LayerProvider>
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
            mattis tristique nunc ac lacinia. Vestibulum non pulvinar turpis, posuere consequat
            arcu. Fusce ut urna blandit, finibus nisi a, molestie elit. Nulla sed eleifend mi.
          </Text>
        </Box>
      </Dialog>
    </LayerProvider>
  )
}

function LayeringStory() {
  return (
    <Box padding={[4, 5, 6]}>
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
        <Dialog
          header="Layering example"
          id="layering-example"
          onClose={useAction('onEscape')}
          zOffset={100}
        >
          <Box padding={4}>
            <DebugLayer />
          </Box>
        </Dialog>
      </LayerProvider>
    </Box>
  )
}

function PositionStory() {
  const open = useBoolean('Open', true, 'Props')
  const position = useSelect('Position', DIALOG_POSITION_OPTIONS, 'fixed', 'Props')

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

function ProviderStory() {
  return (
    <DialogProvider position="absolute" zOffset={1000}>
      <Dialog header="Outer" id="provider-example">
        <Dialog header="Inner" id="nested-provider-example" />
      </Dialog>
    </DialogProvider>
  )
}

function AutoFocusStory() {
  const autoFocus = useBoolean('Auto-focus', true, 'Props')
  const open = useBoolean('Open', false, 'Props')

  if (!open) {
    return (
      <Box padding={4}>
        <Text muted>Use knobs to open the dialog</Text>
      </Box>
    )
  }

  return (
    <Dialog __unstable_autoFocus={autoFocus} header="Auto-focus example" id="auto-focus-example">
      <Box padding={4}>
        <Button text="Focusable button" />
      </Box>
    </Dialog>
  )
}
