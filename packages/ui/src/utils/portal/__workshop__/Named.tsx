import {Card, Label, Portal, PortalProvider, Stack, Text} from '@sanity/ui'
import {useMemo, useState} from 'react'

import {CardWrapper} from '$workshop'

export default function NamedStory(): React.JSX.Element {
  const [portal1Element, setPortal1Element] = useState<HTMLDivElement | null>(null)
  const [portal2Element, setPortal2Element] = useState<HTMLDivElement | null>(null)
  const [portal3Element, setPortal3Element] = useState<HTMLDivElement | null>(null)
  const __unstable_elements = useMemo(
    () => ({
      portal1: portal1Element,
      portal2: portal2Element,
      portal3: portal3Element,
    }),
    [portal1Element, portal2Element, portal3Element],
  )

  return (
    <PortalProvider __unstable_elements={__unstable_elements}>
      <CardWrapper gap={5} tone="default">
        <Stack gap={3}>
          <Label muted size={1} weight="medium">
            Portal 1
          </Label>
          <div ref={setPortal1Element} />
        </Stack>

        <Stack gap={3}>
          <Label muted size={1} weight="medium">
            Portal 2
          </Label>
          <div ref={setPortal2Element} />
        </Stack>

        <Stack gap={3}>
          <Label muted size={1} weight="medium">
            Portal 3
          </Label>
          <div ref={setPortal3Element} />
        </Stack>

        <Portal __unstable_name="portal1">
          <Card muted padding={4} radius={3} shadow={1}>
            <Text size={1}>Card A in portal 1</Text>
          </Card>
        </Portal>

        <Portal __unstable_name="portal2">
          <Card muted padding={4} radius={3} shadow={1}>
            <Text size={1}>Card B in portal 2</Text>
          </Card>
        </Portal>

        <Portal __unstable_name="portal3">
          <Card muted padding={4} radius={3} shadow={1}>
            <Text size={1}>Card C in portal 3</Text>
          </Card>
        </Portal>

        <Portal __unstable_name="portal3">
          <Card muted padding={4} radius={3} shadow={1}>
            <Text size={1}>Card D in portal 3</Text>
          </Card>
        </Portal>
      </CardWrapper>
    </PortalProvider>
  )
}
