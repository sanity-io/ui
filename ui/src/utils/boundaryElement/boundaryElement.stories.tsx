import {Box, BoundaryElementProvider, Button, Card, Text, Tooltip} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React, {useState} from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Utils/BoundaryElement',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  return <BoundaryElementExample />
}

function BoundaryElementExample() {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card padding={7} ref={setBoundaryElement}>
      <BoundaryElementProvider element={boundaryElement}>
        <Tooltip
          content={
            <Box padding={2}>
              <Text>Test aldsakm alkdmal dmalskdm alkdmlakds</Text>
            </Box>
          }
          placement="top"
        >
          <Button text={<>Hover me</>} />
        </Tooltip>
      </BoundaryElementProvider>
    </Card>
  )
}
