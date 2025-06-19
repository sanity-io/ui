import {
  BoundaryElementProvider,
  Box,
  Card,
  Flex,
  Popover,
  type PopoverProps,
  type PopoverUpdateCallback,
  Stack,
  Text,
} from '@sanity/ui'
import type {CardTone} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'
import {useCallback, useEffect, useRef, useState} from 'react'

import {WORKSHOP_CARD_TONE_OPTIONS} from '$workshop'

const SIDE_PANEL_WIDTH = {
  sm: 300,
  md: 400,
  lg: 500,
  xl: 600,
}

export default function SidePanelStory(): React.JSX.Element {
  const sidePanelWidth = useSelect('Side panel width', SIDE_PANEL_WIDTH, SIDE_PANEL_WIDTH.md)
  const [sidePanel, setSidePanel] = useState<HTMLDivElement | null>(null)
  const updateRef = useRef<PopoverUpdateCallback>(undefined)
  const tone = useSelect('Tone', WORKSHOP_CARD_TONE_OPTIONS) ?? 'inherit'

  useEffect(() => updateRef.current?.(), [sidePanelWidth])

  return (
    <Flex height="fill">
      <Card flex={1}>
        <Box padding={4}>
          <Text>
            This story shows that popovers respect their boundary when used in a side panel.
          </Text>
        </Box>
      </Card>
      <BoundaryElementProvider element={sidePanel}>
        <Card borderLeft flex="none" ref={setSidePanel} style={{width: sidePanelWidth}} width={0}>
          <Stack gap={5} padding={4}>
            <Text muted size={1}>
              Click the <code>reference</code> text below to toggle the popover.
            </Text>

            <Card border padding={3}>
              <Text size={1}>
                Some editor <InlineObject tone={tone} updateRef={updateRef} />
              </Text>
            </Card>
          </Stack>
        </Card>
      </BoundaryElementProvider>
    </Flex>
  )
}

function InlineObject(props: {tone: CardTone | 'inherit'; updateRef?: PopoverProps['updateRef']}) {
  const {tone, updateRef} = props
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return (
    <Popover
      content={
        <Box padding={3}>
          <Text size={1}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Text>
        </Box>
      }
      constrainSize
      open={open}
      overflow="auto"
      portal
      tone={tone}
      width={0}
      updateRef={updateRef}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <code onClick={handleClick}>reference</code>
    </Popover>
  )
}
