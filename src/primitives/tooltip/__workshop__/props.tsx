import {Button, Card, Flex, Text, Tooltip} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const text =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

  const content = useText('Content', text)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 2, 'Props')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useBoolean('Portal', true)
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 2)

  return (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
        <Tooltip
          content={<Text size={1}>{content}</Text>}
          padding={padding}
          placement={placement}
          portal={portal}
          shadow={shadow}
        >
          <Button mode="bleed" text="Hover me" />
        </Tooltip>
      </Flex>
    </Card>
  )
}
