import type {Meta, StoryObj} from '@storybook/react'
import {Badge, Card, Flex, Stack} from '../../src/core/primitives'
import {BADGE_TONES, CARD_TONES, RADII} from '../constants'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
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
          <Badge {...props} key={value} radius={value}>
            {value}
          </Badge>
        ),
        rows: RADII,
      })}
    </>
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
          <Badge {...props} key={value} tone={value}>
            {value}
          </Badge>
        ),
        rows: BADGE_TONES,
      })}
    </>
  ),
}

export const InheritedTones: Story = {
  render: (props) => {
    return (
      <Stack space={3}>
        {rowBuilder({
          renderItem: ({value}) => (
            <Card border key={value} padding={4} tone={value}>
              <Flex align="center">
                <Badge {...props}>{value}</Badge>
              </Flex>
            </Card>
          ),
          rows: CARD_TONES,
        })}
      </Stack>
    )
  },
}
