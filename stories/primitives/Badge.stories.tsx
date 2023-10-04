import type {Meta, StoryObj} from '@storybook/react'
import {Badge, Flex, Stack} from '../../src/primitives'
import {BADGE_MODES, BADGE_TONES, RADII} from '../constants'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {matrixBuilder} from '../helpers/matrixBuilder'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    fontSize: getFontSizeControls('label'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (props) => <Badge {...props} />,
}

export const Radius: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'tone'],
    },
  },
  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Badge {...props} radius={value}>
            {value}
          </Badge>
        ),
        rows: RADII,
      })}
    </>
  ),
}

export const Modes: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Flex gap={3}>
      <Badge {...props}>Default</Badge>
      <Badge {...props} mode="outline">
        Outline
      </Badge>
    </Flex>
  ),
}

export const Tones: Story = {
  parameters: {
    controls: {
      include: ['fontSize', 'mode', 'padding', 'radius'],
    },
  },

  render: (props) => (
    <>
      {rowBuilder({
        renderItem: ({value}) => (
          <Badge {...props} tone={value}>
            {value}
          </Badge>
        ),
        rows: BADGE_TONES,
      })}
    </>
  ),
}

export const MultipleStyles: Story = {
  args: {
    children: 'Badge',
  },
  parameters: {
    controls: {
      include: ['fontSize', 'padding', 'radius'],
    },
  },
  render: (props) => (
    <Stack space={3}>
      {matrixBuilder({
        scheme: 'light',
        columns: BADGE_TONES,
        rows: BADGE_MODES,
        title: 'Mode / Tone',
        renderItem: ({row, column}) => (
          <Flex gap={1} justify={'center'} align={'center'}>
            <Badge {...props} mode={row} tone={column} />
          </Flex>
        ),
      })}
      {matrixBuilder({
        scheme: 'dark',
        columns: BADGE_TONES,
        rows: BADGE_MODES,
        title: 'Mode / Tone',
        renderItem: ({row, column}) => (
          <Flex gap={1} justify={'center'} align={'center'}>
            <Badge {...props} mode={row} tone={column} />
          </Flex>
        ),
      })}
    </Stack>
  ),
}
