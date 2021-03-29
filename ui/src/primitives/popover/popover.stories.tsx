import {
  Box,
  Button,
  Card,
  Container,
  LayerProvider,
  Placement,
  Popover,
  PortalProvider,
  Stack,
  Text,
  ThemeColorToneKey,
  useLayer,
} from '@sanity/ui'
import {boolean, withKnobs, select, text} from '@storybook/addon-knobs'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Atoms/Popover',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const arrow = boolean('Arrow', true, 'Props')

  const content = text('Content', 'Hello, world', 'Props')

  const constrainSize = boolean('Constrain size', false, 'Props')

  const open = boolean('Open', true, 'Props')

  const padding = select(
    'Padding',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
    },
    3,
    'Props'
  )

  const placement = select(
    'Placement',
    {
      Top: 'top',
      'Top start': 'top-start',
      'Top end': 'top-end',
      Right: 'right',
      'Right start': 'right-start',
      'Right end': 'right-end',
      Left: 'left',
      'Left start': 'left-start',
      'Left end': 'left-end',
      Bottom: 'bottom',
      'Bottom start': 'bottom-start',
      'Bottom end': 'bottom-end',
    },
    'bottom',
    'Props'
  )

  const portal = boolean('Portal', true, 'Props')

  const preventOverflow = boolean('Prevent overflow', false, 'Props')

  const radius = select(
    'Radius',
    {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
    },
    2,
    'Props'
  )

  const width = select(
    'Width',
    {
      Auto: 'auto',
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
    },
    'auto',
    'Props'
  )

  const props = {
    arrow,
    content: <Text>{content}</Text>,
    constrainSize,
    open,
    padding,
    placement,
    portal,
    preventOverflow,
    radius,
    width,
  }

  return <PropsExample {...props} />
}

function PropsExample(props: any) {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)

  return (
    <PortalProvider element={portalElement}>
      <div
        style={{
          height: 'calc(100vh - 120px)',
          position: 'relative',
          margin: 60,
          overflow: 'auto',
          outline: '1px solid red',
        }}
      >
        <Card padding={4} style={{padding: '150vh 0', textAlign: 'center'}}>
          <Popover {...props}>
            <Button text="Hello" />
          </Popover>
        </Card>
        <div ref={setPortalElement} />
      </div>
    </PortalProvider>
  )
}

export const recursive = () => {
  return (
    <LayerProvider>
      <RecursiveExample />
    </LayerProvider>
  )
}

const placements: Placement[] = ['top', 'right', 'bottom', 'left']
const tones: ThemeColorToneKey[] = ['primary', 'positive', 'caution', 'critical']

function RecursiveExample({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {isTopLayer} = useLayer()
  const [seed] = useState(() => Math.floor(Math.random() * 4))
  const fallbackPlacements = useMemo(() => {
    const before = placements.slice(seed)
    const after = placements.slice(0, seed)

    return before.concat(after)
  }, [seed])

  useEffect(() => {
    if (open === false) buttonRef.current?.focus()
  }, [open])

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isTopLayer) return
      if (event.key === 'Escape' && onClose) onClose()
    },
    [isTopLayer, onClose]
  )

  return (
    <Popover
      fallbackPlacements={fallbackPlacements}
      content={<RecursiveExample onClose={handleClose} />}
      open={open}
      placement={fallbackPlacements[3]}
      tone={tones[seed]}
    >
      <Box padding={1}>
        <Button
          mode="bleed"
          onKeyDown={handleKeyDown}
          onClick={handleOpen}
          ref={buttonRef}
          text="Open"
        />
      </Box>
    </Popover>
  )
}

export const matchReferenceWidth = () => {
  const placement = select(
    'Placement',
    {
      Top: 'top',
      'Top start': 'top-start',
      'Top end': 'top-end',
      Right: 'right',
      'Right start': 'right-start',
      'Right end': 'right-end',
      Left: 'left',
      'Left start': 'left-start',
      'Left end': 'left-end',
      Bottom: 'bottom',
      'Bottom start': 'bottom-start',
      'Bottom end': 'bottom-end',
    },
    'bottom',
    'Props'
  )

  return (
    <Popover
      arrow={false}
      content={
        <Box padding={2}>
          <Text>Content</Text>
        </Box>
      }
      matchReferenceWidth
      open
      placement={placement}
    >
      <Container width={0}>
        <Stack>
          <Button fontSize={3} padding={5} text="Button" />
        </Stack>
      </Container>
    </Popover>
  )
}
