import {EllipsisVerticalIcon} from '@sanity/icons'
import {Button, Card, CONTAINER, Flex, Popover, Text, useClickOutsideEvent} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'
import {useCallback, useRef, useState} from 'react'

import {
  WORKSHOP_FLEX_ALIGN_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_PLACEMENT_OPTIONS,
} from '$workshop'

export default function AlignedStory(): React.JSX.Element {
  const constrainSize = useBoolean('Constrain size', false)
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS)
  const portal = useBoolean('Portal', true)
  const width = useSelect('Width', CONTAINER, 'auto')
  const flexAlign = useSelect('Align', WORKSHOP_FLEX_ALIGN_OPTIONS)
  const flexJustify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS)

  const [open, setOpen] = useState(false)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const buttonElementRef = useRef<HTMLButtonElement | null>(null)
  const popoverElementRef = useRef<HTMLDivElement | null>(null)

  const content = (
    <Text size={1}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at nisl at sem tempor
      hendrerit scelerisque ut libero. Maecenas iaculis efficitur lorem, ac faucibus mi imperdiet
      quis. Cras a consectetur erat. Fusce imperdiet, dolor et pellentesque iaculis, ex quam luctus
      felis, non ultrices enim sem vitae quam. Duis lorem velit, lacinia at rhoncus a, tempus vel
      neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Sed id mauris quam. Nam finibus sapien non lacinia ultricies. Integer fermentum tortor at
      pellentesque faucibus. In venenatis commodo placerat. Curabitur commodo tortor libero, vel
      pellentesque elit luctus sodales. Donec mattis tristique nunc ac lacinia. Vestibulum non
      pulvinar turpis, posuere consequat arcu. Fusce ut urna blandit, finibus nisi a, molestie elit.
      Nulla sed eleifend mi.
    </Text>
  )

  const handleToggleOpen = useCallback(() => setOpen((v) => !v), [])

  useClickOutsideEvent(
    () => setOpen(false),
    () => [buttonElementRef.current, popoverElementRef.current],
  )

  return (
    <Card height="fill" padding={[4, 5, 6]} sizing="border" tone="transparent">
      <Card ref={setBoundaryElement} height="fill" padding={2} shadow={1} sizing="border">
        <Flex align={flexAlign} height="fill" justify={flexJustify}>
          <Popover
            ref={popoverElementRef}
            constrainSize={constrainSize}
            content={content}
            floatingBoundary={boundaryElement}
            open={open}
            overflow="auto"
            padding={3}
            placement={placement}
            portal={portal}
            width={width}
          >
            <Button
              ref={buttonElementRef}
              icon={EllipsisVerticalIcon}
              mode="bleed"
              selected={open}
              onClick={handleToggleOpen}
            />
          </Popover>
        </Flex>
      </Card>
    </Card>
  )
}
