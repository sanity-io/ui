import type {Meta, StoryFn, StoryObj} from '@storybook/react'
import {userEvent, within} from '@storybook/testing-library'
import {Button, Card, Text, Tooltip} from '../../src/primitives'
import {PLACEMENT_OPTIONS} from '../constants'
import {getShadowControls, getSpaceControls} from '../controls'
import {rowBuilder} from '../helpers/rowBuilder'

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
    (Story: StoryFn): JSX.Element => (
      <Card padding={6}>
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

export const Basic: Story = {
  render: (props) => {
    return <Tooltip {...props} />
  },
}

export const Placements: Story = {
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
    await canvas.findByText('Content', undefined, {timeout: 300})
  },
}
