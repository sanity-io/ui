import {CalendarIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Inline,
  LayerProvider,
  Placement,
  Popover,
  PortalProvider,
  Stack,
  Text,
  ThemeColorToneKey,
  useClickOutside,
  useLayer,
} from '@sanity/ui'
import {defineScope, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'

export default defineScope('primitives/popover', 'Popover', [
  {name: 'plain', title: 'Plain', component: PlainStory},
  {name: 'recursive', title: 'Recursive', component: RecursiveStory},
  {name: 'match-ref-width', title: 'Match reference width', component: MatchReferenceWidthStory},
  {name: 'margins', title: 'Margins', component: MarginsStory},
  {name: 'right-aligned', title: 'Right-aligned', component: RightAlignedStory},
])

const SPACE_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
}

const PLACEMENT_OPTIONS: {[key: string]: Placement} = {
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
}

const RADIUS_OPTIONS = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
}

const WIDTH_OPTIONS: {[key: string]: 'auto' | number} = {
  Auto: 'auto',
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
}

function PlainStory() {
  const arrow = useBoolean('Arrow', true, 'Props')
  const content = useText('Content', 'Hello, world', 'Props')
  const constrainSize = useBoolean('Constrain size', false, 'Props')
  const matchReferenceWidth = useBoolean('Match reference width', false, 'Props')
  const open = useBoolean('Open', true, 'Props')
  const padding = useSelect('Padding', SPACE_OPTIONS, 3, 'Props')
  const placement = useSelect('Placement', PLACEMENT_OPTIONS, 'bottom', 'Props')
  const portal = useBoolean('Portal', true, 'Props')
  const preventOverflow = useBoolean('Prevent overflow', false, 'Props')
  const radius = useSelect('Radius', RADIUS_OPTIONS, 2, 'Props')
  const width = useSelect('Width', WIDTH_OPTIONS, 'auto', 'Props')
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
          width: '100%',
        }}
      >
        <Card padding={4} style={{padding: '150vh 0', textAlign: 'center'}}>
          <Popover
            __unstable_margins={[1, 1, 1, 1]}
            arrow={arrow}
            content={<Text>{content}</Text>}
            constrainSize={constrainSize}
            matchReferenceWidth={matchReferenceWidth}
            open={open}
            padding={padding}
            placement={placement}
            portal={portal}
            preventOverflow={preventOverflow}
            radius={radius}
            width={width}
          >
            <Button text="This button is the popover reference" />
          </Popover>
        </Card>
        <div ref={setPortalElement} />
      </div>
    </PortalProvider>
  )
}

function RecursiveStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <LayerProvider>
        <RecursiveExample />
      </LayerProvider>
    </Flex>
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
      <Button
        mode="bleed"
        onKeyDown={handleKeyDown}
        onClick={handleOpen}
        radius={3}
        ref={buttonRef}
        text="Open"
      />
    </Popover>
  )
}

function MatchReferenceWidthStory() {
  const arrow = useBoolean('Arrow', true, 'Props')
  const placement = useSelect('Placement', PLACEMENT_OPTIONS, 'bottom', 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        arrow={arrow}
        content={
          <Box padding={2}>
            <Text>Content</Text>
          </Box>
        }
        matchReferenceWidth
        open
        placement={placement}
        radius={2}
      >
        <Container width={0}>
          <Stack>
            <Button fontSize={3} text="Button" />
          </Stack>
        </Container>
      </Popover>
    </Flex>
  )
}

function MarginsStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        __unstable_margins={[-5, -5, -5, -5]}
        arrow={false}
        content={
          <Box padding={2}>
            <Text align="center" muted size={1}>
              Popover
            </Text>
          </Box>
        }
        matchReferenceWidth
        open
        placement="bottom-start"
        // radius={0}
      >
        <Container width={0}>
          <Card padding={2} muted shadow={1}>
            <Text align="center" muted size={1}>
              Reference
            </Text>
          </Card>
        </Container>
      </Popover>
    </Flex>
  )
}

function RightAlignedStory() {
  const [open, setOpen] = useState(false)
  const [popoverElement, setPopoverElement] = useState<HTMLDivElement | null>(null)
  const content = (
    <Box padding={3}>
      <Inline space={3}>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
        <Text>Popover</Text>
      </Inline>
    </Box>
  )

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  useClickOutside(handleClose, [popoverElement])

  return (
    <Flex justify="flex-end" padding={[4, 5, 6]}>
      <Popover content={content} open={open} portal preventOverflow ref={setPopoverElement}>
        <Button icon={CalendarIcon} mode="ghost" onClick={handleOpen} selected={open} />
      </Popover>
    </Flex>
  )
}
