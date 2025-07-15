import {Card, Code, Grid} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {HEIGHT_CONTROLS, OVERFLOW_CONTROLS, SPACE_CONTROLS} from '../controls'

const meta: Meta<typeof Grid> = {
  component: Grid,
  args: {
    children: [
      Array.from({length: 12}, (_, index) => (
        <Card key={`grid${index + 1}`} padding={2}>
          <Code>{index + 1}</Code>
        </Card>
      )),
    ],
  },
  argTypes: {
    padding: SPACE_CONTROLS,
    paddingBottom: SPACE_CONTROLS,
    paddingLeft: SPACE_CONTROLS,
    paddingRight: SPACE_CONTROLS,
    paddingTop: SPACE_CONTROLS,
    paddingY: SPACE_CONTROLS,
    paddingX: SPACE_CONTROLS,
    margin: SPACE_CONTROLS,
    marginBottom: SPACE_CONTROLS,
    marginLeft: SPACE_CONTROLS,
    marginRight: SPACE_CONTROLS,
    marginTop: SPACE_CONTROLS,
    marginY: SPACE_CONTROLS,
    marginX: SPACE_CONTROLS,
    height: HEIGHT_CONTROLS,
    overflow: OVERFLOW_CONTROLS,
    gap: SPACE_CONTROLS,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Grid>

export const Default: Story = {
  render: (props) => <Grid {...props} />,
}

export const Columns: Story = {
  args: {columns: [1, 2, 3, 4, 5, 6, 7]},
  render: (props) => <Grid {...props} />,
}
