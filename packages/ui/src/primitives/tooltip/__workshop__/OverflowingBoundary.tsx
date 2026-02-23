import {BoundaryElementProvider, Button, Card, Code, Flex, Stack, Text, Tooltip} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useCallback, useState} from 'react'

import {WORKSHOP_PLACEMENT_OPTIONS} from '$workshop'

export default function OverflowingBoundaryStory(): React.JSX.Element {
  const content = useText(
    'Content',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis consectetur malesuada. Sed lobortis est dolor, eget imperdiet velit placerat et. Aenean posuere mi non aliquet iaculis. Donec fermentum pulvinar purus at sagittis. Ut tincidunt massa odio, sed finibus justo ullamcorper id. Nam venenatis justo non ligula elementum cursus. Pellentesque laoreet justo in mollis sagittis. In lacinia ornare ultrices. Suspendisse potenti.',
  )
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useBoolean('Portal', false)
  const useBoundaryElement = useBoolean('Use boundary element', true)

  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [buttonsVisible, setButtonsVisible] = useState(true)

  const handleHideButtons = useCallback(() => {
    setButtonsVisible(false)
  }, [])

  const handleShowButtons = useCallback(() => {
    setButtonsVisible(true)
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" style={{height: '200vh'}}>
      <BoundaryElementProvider element={useBoundaryElement ? boundaryElement : null}>
        <Card
          ref={setBoundaryElement}
          border
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
              <Stack gap={2}>
                <Code size={1}>Placement: {placement}</Code>
                <Button
                  disabled={buttonsVisible}
                  fontSize={1}
                  text="Show buttons"
                  onClick={handleShowButtons}
                />
              </Stack>
            </Flex>
          </Flex>

          {buttonsVisible && (
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
                onClick={handleHideButtons}
              />
            </Tooltip>
          )}
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}
