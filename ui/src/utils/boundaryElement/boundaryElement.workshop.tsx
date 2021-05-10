import {Box, BoundaryElementProvider, Button, Card, Text, Tooltip} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React, {useState} from 'react'

export default defineScope('utils/boundaryElement', 'BoundaryElement', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
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
