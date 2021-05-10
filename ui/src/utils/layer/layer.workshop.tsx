import {CloseIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Layer,
  LayerProvider,
  Stack,
  Text,
  useLayer,
} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'

export default defineScope('utils/layer', 'Layer', [
  {name: 'plain', title: 'Plain', component: PlainStory},
  {name: 'multiple-roots', title: 'Multiple roots', component: MultipleRootsStory},
  {name: 'responsive-z-offset', title: 'Responsive z-offset', component: ResponsiveZOffsetStory},
])

function PlainStory() {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <LayerProvider>
      <Card radius={2}>
        <Box padding={3}>
          <Text>
            <strong>Root layer</strong>
          </Text>
        </Box>
        <Box padding={3}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Button mode="ghost" onClick={handleOpen} text="Open layer 1" />
            {open && (
              <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Layer1 onClose={handleClose} />
              </Layer>
            )}
          </Stack>
        </Box>
      </Card>
    </LayerProvider>
  )
}

function LayerDebugInfo() {
  const layer = useLayer()

  return (
    <Code>
      zIndex={layer.zIndex}, size={layer.size}
    </Code>
  )
}

function Layer1({onClose}: {onClose: () => void}) {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 1</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
          <Button mode="ghost" onClick={handleOpen} text="Open layer 2" />
          {open && (
            <Layer style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Layer2 onClose={handleClose} />
            </Layer>
          )}
        </Stack>
      </Box>
    </Card>
  )
}

function Layer2({onClose}: {onClose: () => void}) {
  return (
    <Card radius={2} shadow={3}>
      <Flex>
        <Box flex={1} padding={3}>
          <Text>
            <strong>Layer 2</strong>
          </Text>
        </Box>
        <Box padding={1}>
          <Button icon={CloseIcon} mode="bleed" onClick={onClose} padding={2} />
        </Box>
      </Flex>
      <Box padding={3}>
        <Stack space={3}>
          <LayerDebugInfo />
        </Stack>
      </Box>
    </Card>
  )
}

function MultipleRootsStory() {
  return (
    <Stack space={4}>
      <LayerProvider zOffset={100}>
        <Card padding={3} shadow={1}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
      <LayerProvider zOffset={200}>
        <Card as={Layer as any} padding={3} shadow={5} style={{top: -50, left: 30}}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
    </Stack>
  )
}

function ResponsiveZOffsetStory() {
  return (
    <Layer id="responsive-layer" zOffset={[1, 2, 3, 4, 5, 6, 7]}>
      <Card padding={[1, 2, 3, 4, 5, 6, 7]} shadow={1}>
        <LayerDebugInfo />
      </Card>
    </Layer>
  )
}
