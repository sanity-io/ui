import {
  BoundaryElementProvider,
  Button,
  Card,
  Flex,
  Portal,
  PortalProvider,
  Stack,
  Text,
  Tooltip,
} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {useMemo, useState} from 'react'

import {WORKSHOP_PLACEMENT_OPTIONS} from '$workshop'

const PORTAL_OPTIONS = {
  '(true)': true,
  '(false)': false,
  'portal1': 'portal1',
}

export default function CustomPortalStory(): React.JSX.Element {
  const content = useText(
    'Content',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mollis consectetur malesuada. Sed lobortis est dolor, eget imperdiet velit placerat et. Aenean posuere mi non aliquet iaculis. Donec fermentum pulvinar purus at sagittis. Ut tincidunt massa odio, sed finibus justo ullamcorper id. Nam venenatis justo non ligula elementum cursus. Pellentesque laoreet justo in mollis sagittis. In lacinia ornare ultrices. Suspendisse potenti.',
  )
  // @ts-expect-error - TODO: fix this
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useSelect('Portal', PORTAL_OPTIONS)
  const useBoundaryElement = useBoolean('Use boundary element', true)

  const [portal1Element, setPortal1Element] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const __unstable_elements = useMemo(
    () => ({
      portal1: portal1Element,
    }),
    [portal1Element],
  )

  return (
    <PortalProvider __unstable_elements={__unstable_elements}>
      <Flex align="center" height="fill" justify="center">
        <BoundaryElementProvider element={useBoundaryElement ? boundaryElement : null}>
          <Card
            border
            padding={4}
            ref={setBoundaryElement}
            style={{
              height: 'calc(100vh - 100px)',
              position: 'relative',
              width: '500px',
            }}
          >
            <Text>Boundary element</Text>
            <Flex align="center" height="fill" justify="center">
              <Flex justify="center">
                <Stack gap={2}>
                  <Tooltip
                    boundaryElement={useBoundaryElement ? boundaryElement : null}
                    content={content ? <Text size={1}>{content}</Text> : undefined}
                    padding={2}
                    // @ts-expect-error - TODO: fix this
                    placement={placement}
                    portal={portal}
                  >
                    <Button mode="bleed" text="Tooltip" />
                  </Tooltip>
                </Stack>
              </Flex>
            </Flex>
          </Card>
        </BoundaryElementProvider>
      </Flex>

      <Card
        border
        margin={4}
        padding={4}
        ref={setPortal1Element}
        style={{
          left: 0,
          position: 'absolute',
          top: 0,
          width: '175px',
        }}
        tone="critical"
      />

      <Portal __unstable_name="portal1">
        <Stack gap={4}>
          <Text size={1} weight="medium">
            Portal 1 content
          </Text>
          <Text size={1}>
            The tooltip's max-width should not exceed this container's width (minus padding) if it's
            set to use this portal
          </Text>
        </Stack>
      </Portal>
    </PortalProvider>
  )
}
