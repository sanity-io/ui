import {BoundaryElementProvider, Button, Card, Text, Tooltip} from '@sanity/ui'
import type {Meta, StoryObj} from '@storybook/react-vite'
import {useState} from 'react'

const meta: Meta = {
  parameters: {controls: {include: []}},
}

export default meta
type Story = StoryObj

function BoundaryElementStory() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card padding={7} ref={setBoundaryElement}>
      <BoundaryElementProvider element={boundaryElement}>
        <Tooltip
          content={<Text size={1}>Test aldsakm alkdmal dmalskdm alkdmlakds</Text>}
          placement="top"
        >
          <Button text={<>Hover me</>} />
        </Tooltip>
      </BoundaryElementProvider>
    </Card>
  )
}

export const Default: Story = {
  render: () => <BoundaryElementStory />,
}
