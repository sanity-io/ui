import {Badge, Card, Flex, Stack} from '@sanity/ui'
import {RADIUS, THEME_COLOR_CARD_TONES, THEME_COLOR_STATE_TONES} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {
  ELEMENT_TONES_CONTROLS,
  FONT_TEXT_SIZE_CONTROLS,
  RADIUS_CONTROLS,
  SPACE_CONTROLS,
} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof Badge> = {
  component: Badge,
  args: {
    children: 'Jackdaws love my big sphinx of quartz',
  },
  argTypes: {
    fontSize: FONT_TEXT_SIZE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
    tone: ELEMENT_TONES_CONTROLS,
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
        rows: [...RADIUS],
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
        rows: [...THEME_COLOR_STATE_TONES],
      })}
    </>
  ),
}

export const InheritedTones: Story = {
  render: (props) => {
    return (
      <Stack gap={3}>
        {rowBuilder({
          renderItem: ({value}) => (
            <Card border key={value} padding={4} tone={value}>
              <Flex align="center">
                <Badge {...props}>{value}</Badge>
              </Flex>
            </Card>
          ),
          rows: [...THEME_COLOR_CARD_TONES],
        })}
      </Stack>
    )
  },
}
