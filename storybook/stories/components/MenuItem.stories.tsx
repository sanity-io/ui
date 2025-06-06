import {Card, Container, LayerProvider, Menu, MenuItem} from '@sanity/ui'
import type {Meta, StoryFn, StoryObj} from '@storybook/react-vite'

import {SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof MenuItem> = {
  args: {
    text: 'Menu item',
  },
  argTypes: {
    disabled: {control: 'boolean'},
    gap: SPACE_CONTROLS,
    padding: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
  },
  component: MenuItem,
  decorators: [
    (Story: StoryFn): React.JSX.Element => (
      <Container width={0}>
        <Card radius={3} shadow={2}>
          <LayerProvider>
            <Menu>
              {/* @ts-expect-error fix later */}
              <Story />
            </Menu>
          </LayerProvider>
        </Card>
      </Container>
    ),
  ],
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MenuItem>

export const Default: Story = {
  render: (props) => {
    return <MenuItem {...props} />
  },
}
