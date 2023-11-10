import {BoundaryElementProvider, Button, Card, Code, Flex, Text, Tooltip} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useState} from 'react'
import {WORKSHOP_PLACEMENT_OPTIONS} from '../../../__workshop__/constants'

export default function ResizableBoundaryStory() {
  const content = useText(
    'Content',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis consectetur malesuada. Sed lobortis est dolor, eget imperdiet velit placerat et. Aenean posuere mi non aliquet iaculis. Donec fermentum pulvinar purus at sagittis. Ut tincidunt massa odio, sed finibus justo ullamcorper id. Nam venenatis justo non ligula elementum cursus. Pellentesque laoreet justo in mollis sagittis. In lacinia ornare ultrices. Suspendisse potenti.',
  )
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'right')
  const portal = useBoolean('Portal', true)
  const useBoundaryElement = useBoolean('Use boundary element', true)

  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)

  return (
    <Flex align="center" height="fill" justify="center">
      <BoundaryElementProvider element={useBoundaryElement ? boundaryElement : null}>
        <Card
          border
          ref={setBoundaryElement}
          style={{
            height: 'calc(100vh - 100px)',
            overflow: 'hidden',
            position: 'relative',
            resize: 'both',
            width: '500px',
          }}
        >
          <Flex align="center" height="fill" justify="center">
            <Flex justify="center">
              <Code size={1}>Placement: {placement}</Code>
            </Flex>
          </Flex>

          <Tooltip
            content={<Text size={1}>{content}</Text>}
            padding={2}
            placement={placement}
            portal={portal}
          >
            <Button mode="bleed" style={{position: 'absolute', top: 10, left: 10}} text="Tooltip" />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{content}</Text>}
            padding={2}
            placement={placement}
            portal={portal}
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', top: 10, right: 10}}
              text="Tooltip"
            />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{content}</Text>}
            padding={2}
            placement={placement}
            portal={portal}
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', bottom: 10, left: 10}}
              text="Tooltip"
            />
          </Tooltip>
          <Tooltip
            content={<Text size={1}>{content}</Text>}
            padding={2}
            placement={placement}
            portal={portal}
          >
            <Button
              mode="bleed"
              style={{position: 'absolute', bottom: 10, right: 10}}
              text="Tooltip"
            />
          </Tooltip>
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}
