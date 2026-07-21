import {EllipsisVerticalIcon} from '@sanity/icons/EllipsisVertical'
import {
  BoundaryElementProvider,
  Box,
  Button,
  Card,
  Container,
  Flex,
  LayerProvider,
  Placement,
  Popover,
  PopoverProps,
  PopoverUpdateCallback,
  PortalProvider,
  Stack,
  Text,
  useClickOutsideEvent,
  useLayer,
} from '@sanity/ui'
import {ThemeColorToneKey} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'

import {PLACEMENT_OPTIONS, RADII} from '../constants'
import {getRadiusControls, getShadowControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Popover> = {
  args: {
    children: <Button text="This button is the popover reference" />,
    content: <Text size={1}>popover content</Text>,
    open: true,
    padding: 3,
  },
  argTypes: {
    padding: getSpaceControls(),
    radius: getRadiusControls(),
    shadow: getShadowControls(),
  },
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (props) => {
    return (
      <Card paddingY={6}>
        <Popover {...props} />
      </Card>
    )
  },
}

// @todo: understand why this story doesn't render in storybook docs
// (but renders correctly in the individual story preview)
export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <Card padding={6}>
      {rowBuilder({
        gap: 8,
        renderItem: ({value}) => (
          <Popover {...props} key={value} radius={value}>
            <Button text={String(value)} />
          </Popover>
        ),
        rows: RADII,
      })}
    </Card>
  ),
}

export const Controlled: Story = {
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [open, setOpen] = useState(false)

    return (
      <Card padding={6}>
        <Popover {...props} open={open}>
          <Button onClick={() => setOpen(!open)} text="Toggle popover" />
        </Popover>
      </Card>
    )
  },
}

export const Placements: Story = {
  args: {
    animate: true,
    content: <Text size={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>,
    style: {
      maxWidth: '150px',
      wordBreak: 'break-all',
    },
  },
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [open, setOpen] = useState(false)

    return (
      <Card padding={7}>
        {rowBuilder({
          gap: 9,
          renderItem: ({index, value}) => (
            <Popover {...props} key={index} open={open} placement={value}>
              <Button onClick={() => setOpen(!open)} text={value} />
            </Popover>
          ),
          rows: PLACEMENT_OPTIONS,
        })}
      </Card>
    )
  },
}

export const DefaultOpen: Story = {
  render: () => {
    return (
      <Box padding={4} style={{textAlign: 'center'}}>
        <Popover
          content={<Text size={[2, 2, 3, 4]}>Hello, world</Text>}
          padding={4}
          placement="top"
          portal
          open
        >
          <Button mode="ghost" padding={[3, 3, 4]} text="Reference" />
        </Popover>
      </Box>
    )
  },
}

export const WithReferenceElement: Story = {
  render: () => {
    // oxlint-disable-next-line rules-of-hooks
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)

    return (
      <Box padding={4} style={{textAlign: 'center'}}>
        <Box ref={setReferenceElement}>
          <Text>Reference element</Text>
        </Box>
        <Popover
          content={<Text size={[2, 2, 3, 4]}>Hello, world</Text>}
          padding={4}
          placement="top"
          referenceElement={referenceElement}
          portal
          open
        >
          <Button
            mode="ghost"
            padding={[3, 3, 4]}
            text="This button won't be rendered, the popover has a reference element"
          />
        </Popover>
      </Box>
    )
  },
}

export const PlacementStrategy: Story = {
  args: {
    children: (
      <Button text="The popover will position itself on the side with the most viewport space" />
    ),
    constrainSize: true,
    content: <Text size={1}>popover content</Text>,
    fallbackPlacements: ['bottom-start'],
    open: true,
    placement: 'top-start',
    placementStrategy: 'autoPlacement',
  },
  parameters: {
    controls: {
      include: ['fallbackPlacements', 'placement', 'placementStrategy'],
    },
  },
  render: (props) => {
    // oxlint-disable-next-line rules-of-hooks
    const [height, setHeight] = useState(100)

    // oxlint-disable-next-line rules-of-hooks
    const handleUpdate = useCallback(() => {
      setHeight(height === 100 ? 800 : 100)
    }, [height])

    // oxlint-disable-next-line rules-of-hooks
    useEffect(() => {
      const interval = setInterval(handleUpdate, 2000)
      return () => {
        clearInterval(interval)
      }
    }, [handleUpdate])

    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '120vh',
        }}
      >
        <Popover
          {...props}
          content={
            <Card style={{height: `${height}px`, resize: 'vertical'}}>
              <Flex align="center" justify="center" height="fill">
                <Text>Popover content</Text>
              </Flex>
            </Card>
          }
        />
      </Box>
    )
  },
}

function BoundaryTestStory(): React.JSX.Element {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  const updateRef = useRef<PopoverUpdateCallback>(undefined)

  const button = <Button text="reference" selected />

  return (
    <Card
      ref={setBoundaryElement}
      shadow={2}
      style={{
        position: 'absolute',
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      }}
    >
      <div
        data-portal=""
        ref={setPortalElement}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      />

      <div style={{width: '100%', height: '100%', overflow: 'auto'}}>
        <div style={{padding: '150vh'}}>
          <PortalProvider element={portalElement}>
            <BoundaryElementProvider element={boundaryElement}>
              <Popover
                arrow
                content={<Text size={1}>Test</Text>}
                constrainSize
                fallbackPlacements={['left', 'bottom', 'right', 'top']}
                open
                overflow="hidden"
                padding={3}
                placement="bottom"
                portal
                preventOverflow
                radius={2}
                updateRef={updateRef}
              >
                {button}
              </Popover>
            </BoundaryElementProvider>
          </PortalProvider>
        </div>
      </div>
    </Card>
  )
}

export const BoundaryTest: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => <BoundaryTestStory />,
}

const RECURSIVE_PLACEMENTS: Placement[] = ['top', 'right', 'bottom', 'left']
// oxlint-disable-next-line no-deprecated
const RECURSIVE_TONES: ThemeColorToneKey[] = ['primary', 'positive', 'caution', 'critical']

function RecursiveExample({onClose}: {onClose?: () => void}) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const {isTopLayer} = useLayer()
  const [seed] = useState(() => Math.floor(Math.random() * 4))
  const fallbackPlacements = useMemo(() => {
    const before = RECURSIVE_PLACEMENTS.slice(seed)
    const after = RECURSIVE_PLACEMENTS.slice(0, seed)

    return before.concat(after)
  }, [seed])

  useEffect(() => {
    // oxlint-disable-next-line no-unnecessary-boolean-literal-compare
    if (open === false) buttonRef.current?.focus()
  }, [open])

  useEffect(() => {
    setTimeout(() => {
      buttonRef.current?.focus()
    }, 0)
  }, [])

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!isTopLayer) return
      if (event.key === 'Escape' && onClose) onClose()
    },
    [isTopLayer, onClose],
  )

  return (
    <Popover
      fallbackPlacements={fallbackPlacements}
      content={<RecursiveExample onClose={handleClose} />}
      open={open}
      padding={1}
      placement={fallbackPlacements[3]}
      portal
      tone={RECURSIVE_TONES[seed]}
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

export const Recursive: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <LayerProvider>
        <RecursiveExample />
      </LayerProvider>
    </Flex>
  ),
}

export const MatchReferenceWidth: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        arrow
        content={
          <Box padding={3}>
            <Text size={1}>Content</Text>
          </Box>
        }
        matchReferenceWidth
        open
        placement="bottom"
        radius={2}
      >
        <Container width={0}>
          <Stack>
            <Button fontSize={1} mode="ghost" selected text="Button" />
          </Stack>
        </Container>
      </Popover>
    </Flex>
  ),
}

export const Margins: Story = {
  parameters: {controls: {include: []}},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        __unstable_margins={[-8, 8, -8, 8]}
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
  ),
}

function AlignedStory() {
  const [open, setOpen] = useState(false)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const buttonElementRef = useRef<HTMLButtonElement | null>(null)
  const popoverElementRef = useRef<HTMLDivElement | null>(null)

  const content = (
    <Text size={1}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
      hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi imperdiet
      quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis, ex quam luctus
      felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at rhoncus a, tempus vel
      neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Sed id mauris quam. Nam finibus sapien non lacinia ultricies. Integer fermentum tortor at
      pellentesque faucibus. In venenatis commodo placerat. Curabitur commodo tortor libero, vel
      pellentesque elit luctus sodales. Donec mattis tristique nunc ac lacinia. Vestibulum non
      pulvinar turpis, posuere consequat arcu. Fusce ut urna blandit, finibus nisi a, molestie elit.
      Nulla sed eleifend mi.
    </Text>
  )

  const handleToggleOpen = useCallback(() => setOpen((v) => !v), [])

  useClickOutsideEvent(
    () => setOpen(false),
    () => [buttonElementRef.current, popoverElementRef.current],
  )

  return (
    <Card height="fill" padding={[4, 5, 6]} sizing="border" tone="transparent">
      <Card height="fill" padding={2} ref={setBoundaryElement} shadow={1} sizing="border">
        <Flex align="flex-start" height="fill" justify="flex-end">
          <Popover
            // oxlint-disable-next-line no-deprecated
            boundaryElement={boundaryElement}
            content={content}
            open={open}
            overflow="auto"
            padding={3}
            portal
            placement="bottom"
            ref={popoverElementRef}
            width="auto"
          >
            <Button
              icon={EllipsisVerticalIcon}
              mode="bleed"
              onClick={handleToggleOpen}
              ref={buttonElementRef}
              selected={open}
            />
          </Popover>
        </Flex>
      </Card>
    </Card>
  )
}

export const Aligned: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => <AlignedStory />,
}

function SidePanelStory() {
  const [sidePanel, setSidePanel] = useState<HTMLDivElement | null>(null)
  const updateRef = useRef<PopoverUpdateCallback>(undefined)

  return (
    <Flex height="fill">
      <Card flex={1}>
        <Box padding={4}>
          <Text>
            This story shows that popovers respect their boundary when used in a side panel.
          </Text>
        </Box>
      </Card>
      <BoundaryElementProvider element={sidePanel}>
        <Card borderLeft flex="none" ref={setSidePanel} style={{width: 400}}>
          {/* oxlint-disable-next-line no-deprecated */}
          <Stack padding={4} space={5}>
            <Text muted size={1}>
              Click the <code>reference</code> text below to toggle the popover.
            </Text>

            <Card border padding={3}>
              <Text size={1}>
                Some editor <SidePanelInlineObject updateRef={updateRef} />
              </Text>
            </Card>
          </Stack>
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}

function SidePanelInlineObject(props: {updateRef?: PopoverProps['updateRef']}) {
  const {updateRef} = props
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <Popover
      content={
        <Box padding={3}>
          <Text size={1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
      }
      constrainSize
      open={open}
      overflow="auto"
      portal
      width={0}
      updateRef={updateRef}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <code onClick={handleClick}>reference</code>
    </Popover>
  )
}

export const SidePanel: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => <SidePanelStory />,
}
