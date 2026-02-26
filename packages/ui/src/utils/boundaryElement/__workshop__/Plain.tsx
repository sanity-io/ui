import {BoundaryElementProvider, Button, Card, Text, Tooltip} from '@sanity/ui'
import {useState} from 'react'

export default function PlainStory(): React.JSX.Element {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Card ref={setBoundaryElement} padding={7}>
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
