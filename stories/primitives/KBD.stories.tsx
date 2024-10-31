import {Card, KBD, Stack} from '@sanity/ui'
import {RADIUS, THEME_COLOR_CARD_TONES} from '@sanity/ui/theme'
import type {Meta, StoryObj} from '@storybook/react'

import {FONT_TEXT_SIZE_CONTROLS, RADIUS_CONTROLS, SPACE_CONTROLS} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof KBD> = {
  args: {
    children: 'Ctrl',
    style: {verticalAlign: 'top'},
  },
  argTypes: {
    fontSize: FONT_TEXT_SIZE_CONTROLS,
    padding: SPACE_CONTROLS,
    radius: RADIUS_CONTROLS,
  },
  component: KBD,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KBD>

export const Default: Story = {
  render: (props) => {
    return <KBD {...props} />
  },
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
          <KBD {...props} key={value} radius={value}>
            {value}
          </KBD>
        ),
        rows: [...RADIUS],
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
              <KBD {...props}>{value}</KBD>
            </Card>
          ),
          rows: [...THEME_COLOR_CARD_TONES],
        })}
      </Stack>
    )
  },
}
