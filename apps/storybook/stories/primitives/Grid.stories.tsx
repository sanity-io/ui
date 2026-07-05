import {Card, Code, Container, Flex, Grid} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'

import {getHeightControls, getOverflowControls, getSpaceControls} from '../controls'

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
    padding: getSpaceControls(),
    paddingBottom: getSpaceControls(),
    paddingLeft: getSpaceControls(),
    paddingRight: getSpaceControls(),
    paddingTop: getSpaceControls(),
    paddingY: getSpaceControls(),
    paddingX: getSpaceControls(),
    margin: getSpaceControls(),
    marginBottom: getSpaceControls(),
    marginLeft: getSpaceControls(),
    marginRight: getSpaceControls(),
    marginTop: getSpaceControls(),
    marginY: getSpaceControls(),
    marginX: getSpaceControls(),
    height: getHeightControls(),
    overflow: getOverflowControls(),
    gap: getSpaceControls(),
    columns: {control: {type: 'number', min: 1, max: 12}},
    gridTemplateColumns: {control: {type: 'number', min: 1, max: 12}},
    rows: {control: {type: 'number', min: 1, max: 12}},
    gridTemplateRows: {control: {type: 'number', min: 1, max: 12}},
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

export const Responsive: Story = {
  // The Playwright test for this story depends on exact viewport dimensions, so the decorator
  // padding is disabled
  parameters: {controls: {include: []}, padding: 0},
  render: () => (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container width="auto">
        <Grid
          id="responsive-grid"
          columns={[1, 2, 3, 4, 5, 6, 7]}
          gap={[0, 1, 2, 3, 4, 5, 6]}
          rows={[1, 2, 3, 4, 5, 6, 7]}
          style={{textAlign: 'center'}}
        >
          {Array.from({length: 12}, (_, index) => (
            <Card key={index} padding={[1, 2, 3]} tone="neutral">
              <Code>{index + 1}</Code>
            </Card>
          ))}
        </Grid>
      </Container>
    </Flex>
  ),
}
