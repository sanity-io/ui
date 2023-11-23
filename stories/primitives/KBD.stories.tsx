import type {Meta, StoryObj} from '@storybook/react'
import {Card, KBD, Stack} from '../../src/core/primitives'
import {CARD_TONES, RADII} from '../constants'
import {getFontSizeControls, getRadiusControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

const meta: Meta<typeof KBD> = {
  args: {
    children: 'Ctrl',
    style: {verticalAlign: 'top'},
  },
  argTypes: {
    fontSize: getFontSizeControls('code'),
    padding: getSpaceControls(),
    radius: getRadiusControls(),
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
        rows: RADII,
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
              <KBD {...props}>{value}</KBD>
            </Card>
          ),
          rows: CARD_TONES,
        })}
      </Stack>
    )
  },
}
