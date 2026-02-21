import {BoundaryElementProvider, Button, Card, Text, TooltipDelayGroupProvider} from '@sanity/ui'
import {useState} from 'react'

import {CardWrapper} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <CardWrapper pattern="halftone" tone="transparent" width={0}>
      <Text marginBottom={4} muted size={1}>
        Hover the button. The tooltip should render within the bounds of the box, despite of{' '}
        <code>placement="bottom"</code>.
      </Text>

      <TooltipDelayGroupProvider>
        <Card
          ref={setBoundaryElement}
          display="flex"
          justifyContent="space-between"
          padding={3}
          radius={5}
          shadow={1}
          tone="default"
        >
          <BoundaryElementProvider element={boundaryElement}>
            <Button
              mode="ghost"
              text="Button"
              tooltip={{
                placement: 'bottom',
                text: 'Tooltip',
              }}
            />

            <Button
              mode="ghost"
              text="Button"
              tooltip={{
                placement: 'bottom',
                text: 'Tooltip',
              }}
            />
          </BoundaryElementProvider>
        </Card>
      </TooltipDelayGroupProvider>
    </CardWrapper>
  )
}
