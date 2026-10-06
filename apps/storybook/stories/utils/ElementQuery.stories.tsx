import {Box, Card, ElementQuery, Text} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {styled} from 'styled-components'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

const TestCard = styled(Card)`
  --card-fg-color: orange;

  [data-eq-min~='0'] > & {
    --card-fg-color: green;
  }

  [data-eq-min~='1'] > & {
    --card-fg-color: blue;
  }
`

export const Default: Story = {
  render: () => (
    <Box padding={[3, 4, 5]}>
      <Box marginBottom={[3, 4, 5]}>
        <Text>Resize this frame to see the text color change:</Text>
      </Box>

      <ElementQuery media={[100, 200, 300]}>
        <TestCard padding={2} shadow={1}>
          <Text>This card sits inside an element query.</Text>
        </TestCard>
      </ElementQuery>
    </Box>
  ),
}

/**
 * The breakpoints describe the element's own width, not the viewport's: the card is green while
 * its container is narrower than 200px and blue from 200px on, whatever the size of the frame.
 */
export const NarrowContainer: StoryObj<{width: number}> = {
  args: {width: 150},
  argTypes: {width: {control: {type: 'range', min: 0, max: 400, step: 10}}},
  parameters: {controls: {include: ['width']}},
  render: ({width}) => (
    <Box id="element-query-container" style={{width}}>
      <ElementQuery id="element-query" media={[100, 200, 300]}>
        <TestCard padding={2} shadow={1}>
          <Text>This card sits inside a fixed-width container.</Text>
        </TestCard>
      </ElementQuery>
    </Box>
  ),
}
