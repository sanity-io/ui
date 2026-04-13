import {CloseIcon} from '@sanity/icons'
import {Box, Button, Card, Flex, Layer, LayerProvider, Stack, Text} from '@sanity/ui'
import {useCallback, useState} from 'react'

import {CardWrapper} from '$workshop'

import {LayerDebugInfo} from './_debug'

export default function PlainStory(): React.JSX.Element {
  return (
    <CardWrapper gap={4} pattern="halftone" tone="transparent">
      <Root />
      <Root />
      <Root />
    </CardWrapper>
  )
}

function Root() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <LayerProvider>
      <Card radius={4} shadow={1} tone="default">
        <Box padding={4}>
          <Text size={1} weight="medium">
            Root layer
          </Text>
        </Box>
        <Stack gap={4} padding={4}>
          <LayerDebugInfo id="layer-debug-info-1" />
          <Button
            id="open-layer-1"
            mode="ghost"
            selected={open}
            text="Open layer 1"
            onClick={handleOpen}
          />
          {open && (
            <Layer radius={3} shadow={2}>
              <Layer1Content onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Card>
    </LayerProvider>
  )
}

function Layer1Content({onClose}: {onClose: () => void}) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <>
      <Flex>
        <Box flex={1} padding={4}>
          <Text size={1} weight="medium">
            Layer 1
          </Text>
        </Box>
        <Box padding={3}>
          <Button icon={CloseIcon} mode="bleed" padding={2} onClick={onClose} />
        </Box>
      </Flex>

      <Stack gap={4} padding={4}>
        <LayerDebugInfo />
        <Button
          id="open-layer-2"
          mode="ghost"
          selected={open}
          text="Open layer 2"
          onClick={handleOpen}
        />
        {open && (
          <Layer radius={3} shadow={3}>
            <Layer2Content onClose={handleClose} />
          </Layer>
        )}
      </Stack>
    </>
  )
}

function Layer2Content({onClose}: {onClose: () => void}) {
  return (
    <>
      <Flex>
        <Box flex={1} padding={4}>
          <Text size={1} weight="medium">
            Layer 2
          </Text>
        </Box>
        <Box padding={3}>
          <Button icon={CloseIcon} mode="bleed" padding={2} onClick={onClose} />
        </Box>
      </Flex>
      <Stack gap={4} padding={4}>
        <LayerDebugInfo />
      </Stack>
    </>
  )
}
