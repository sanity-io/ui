import {
  BoundaryElementProvider,
  Button,
  Card,
  Code,
  Flex,
  Portal,
  PortalProvider,
  Stack,
  Text,
  Tooltip,
  TooltipDelayGroupProvider,
} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'
import {useCallback, useMemo, useState} from 'react'
import {userEvent, within} from 'storybook/test'

import {PLACEMENT_OPTIONS} from '../constants'
import {getShadowControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const LOREM_CONTENT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis consectetur malesuada. Sed lobortis est dolor, eget imperdiet velit placerat et. Aenean posuere mi non aliquet iaculis. Donec fermentum pulvinar purus at sagittis. Ut tincidunt massa odio, sed finibus justo ullamcorper id. Nam venenatis justo non ligula elementum cursus. Pellentesque laoreet justo in mollis sagittis. In lacinia ornare ultrices. Suspendisse potenti.'

const meta: Meta<typeof Tooltip> = {
  args: {
    children: <Button mode="bleed" text="Hover me" />,
    content: <Text size={1}>I'm a tooltip</Text>,
  },
  argTypes: {
    padding: getSpaceControls(),
    shadow: getShadowControls(),
  },
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Card padding={6}>
        {/* @ts-expect-error fix later */}
        <Story />
      </Card>
    ),
  ],
  parameters: {
    controls: {
      exclude: ['allowedAutoPlacements', 'children', 'content'],
    },
  },
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (props) => {
    return <Tooltip {...props} />
  },
}

export const Animated: Story = {
  args: {animate: true},
  render: (props) => {
    return <Tooltip {...props} />
  },
}

export const Placements: Story = {
  args: {animate: true},
  render: (props) => {
    return (
      <>
        {rowBuilder({
          gap: 4,
          renderItem: ({value}) => (
            <Tooltip {...props} key={value} placement={value}>
              <Button mode="bleed" text={value} />
            </Tooltip>
          ),
          rows: PLACEMENT_OPTIONS,
        })}
      </>
    )
  },
}

export const WithOpenDelay: Story = {
  args: {
    animate: true,
    delay: {open: 200},
  },
  parameters: {
    controls: {
      include: ['content', 'delay'],
    },
  },
  render: (props) => {
    return <Tooltip {...props} />
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    const button = canvas.getByText('Hover me')

    await userEvent.hover(button)
    await canvas.findByText("I'm a tooltip")
  },
}

export const WithDelayGroup: Story = {
  args: {
    animate: true,
    delay: {open: 200},
  },
  parameters: {
    controls: {
      include: ['content', 'delay', 'animate'],
    },
  },
  render: (props) => {
    return (
      <TooltipDelayGroupProvider delay={{open: 200}}>
        <Tooltip {...props} />
        <Tooltip {...props} />
        <Tooltip {...props} />
        <Tooltip {...props} />
      </TooltipDelayGroupProvider>
    )
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement)

    // The story renders multiple tooltips, hover the first one
    const button = canvas.getAllByText('Hover me')[0]

    await userEvent.hover(button)
    await canvas.findByText("I'm a tooltip")
  },
}

function ResizableBoundaryStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Flex align="center" height="fill" justify="center">
      <BoundaryElementProvider element={boundaryElement}>
        <Card
          border
          ref={setBoundaryElement}
          style={{
            height: 'calc(100vh - 100px)',
            overflow: 'hidden',
            position: 'relative',
            resize: 'both',
            width: '500px',
          }}
        >
          <Flex align="center" height="fill" justify="center">
            <Flex justify="center">
              <Code size={1}>Placement: right</Code>
            </Flex>
          </Flex>

          <Tooltip
            content={<Text size={1}>{LOREM_CONTENT}</Text>}
            padding={2}
            placement="right"
            portal
          >
            <Button mode="bleed" style={{position: 'absolute', top: 10, left: 10}} text="Tooltip" />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{LOREM_CONTENT}</Text>}
            padding={2}
            placement="right"
            portal
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', top: 10, right: 10}}
              text="Tooltip"
            />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{LOREM_CONTENT}</Text>}
            padding={2}
            placement="right"
            portal
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', bottom: 10, left: 10}}
              text="Tooltip"
            />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{LOREM_CONTENT}</Text>}
            padding={2}
            placement="right"
            portal
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', bottom: 10, right: 10}}
              text="Tooltip"
            />
          </Tooltip>
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}

export const ResizableBoundary: Story = {
  parameters: {controls: {include: []}},
  render: () => <ResizableBoundaryStory />,
}

function OverflowingBoundaryStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [buttonsVisible, setButtonsVisible] = useState(true)

  const handleHideButtons = useCallback(() => {
    setButtonsVisible(false)
  }, [])

  const handleShowButtons = useCallback(() => {
    setButtonsVisible(true)
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" style={{height: '200vh'}}>
      <BoundaryElementProvider element={boundaryElement}>
        <Card
          border
          ref={setBoundaryElement}
          style={{
            height: 'calc(100vh - 100px)',
            overflow: 'hidden',
            position: 'relative',
            resize: 'both',
            width: '500px',
          }}
        >
          <Flex align="center" height="fill" justify="center">
            <Flex justify="center">
              <Stack space={2}>
                <Code size={1}>Placement: top</Code>
                <Button
                  disabled={buttonsVisible}
                  fontSize={1}
                  onClick={handleShowButtons}
                  text="Show buttons"
                />
              </Stack>
            </Flex>
          </Flex>

          {buttonsVisible && (
            <Tooltip content={<Text size={1}>{LOREM_CONTENT}</Text>} padding={2} placement="top">
              <Button
                mode="bleed"
                onClick={handleHideButtons}
                style={{position: 'absolute', top: 10, right: 10}}
                text="Tooltip"
              />
            </Tooltip>
          )}
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}

export const OverflowingBoundary: Story = {
  parameters: {controls: {include: []}},
  render: () => <OverflowingBoundaryStory />,
}

function CustomPortalStory() {
  const [portal1Element, setPortal1Element] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const __unstable_elements = useMemo(
    () => ({
      portal1: portal1Element,
    }),
    [portal1Element],
  )

  return (
    <PortalProvider __unstable_elements={__unstable_elements}>
      <Flex align="center" height="fill" justify="center">
        <BoundaryElementProvider element={boundaryElement}>
          <Card
            border
            padding={4}
            ref={setBoundaryElement}
            style={{
              height: 'calc(100vh - 100px)',
              position: 'relative',
              width: '500px',
            }}
          >
            <Text>Boundary element</Text>
            <Flex align="center" height="fill" justify="center">
              <Flex justify="center">
                <Stack space={2}>
                  <Tooltip
                    boundaryElement={boundaryElement}
                    content={<Text size={1}>{LOREM_CONTENT}</Text>}
                    padding={2}
                    placement="top"
                    portal="portal1"
                  >
                    <Button mode="bleed" text="Tooltip" />
                  </Tooltip>
                </Stack>
              </Flex>
            </Flex>
          </Card>
        </BoundaryElementProvider>
      </Flex>

      <Card
        border
        margin={4}
        padding={4}
        ref={setPortal1Element}
        style={{
          left: 0,
          position: 'absolute',
          top: 0,
          width: '175px',
        }}
        tone="critical"
      />

      <Portal __unstable_name="portal1">
        <Stack space={4}>
          <Text size={1} weight="medium">
            Portal 1 content
          </Text>
          <Text size={1}>
            The tooltip's max-width should not exceed this container's width (minus padding) if it's
            set to use this portal
          </Text>
        </Stack>
      </Portal>
    </PortalProvider>
  )
}

export const CustomPortal: Story = {
  parameters: {controls: {include: []}, padding: 0},
  render: () => <CustomPortalStory />,
}
