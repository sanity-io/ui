import type {Meta, StoryObj} from '@storybook/react'
import {useCallback, useEffect, useState} from 'react'

import {Box, Button, Card, Flex, Popover, Text} from '../../src/core/primitives'
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
    const [height, setHeight] = useState(100)

    const handleUpdate = useCallback(() => {
      setHeight(height === 100 ? 800 : 100)
    }, [height])

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
