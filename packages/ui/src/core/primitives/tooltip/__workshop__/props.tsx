import {Button, Card, Flex, Stack, Text, Tooltip, TooltipDelayGroupProvider} from '@sanity/ui'
import {useBoolean, useNumber, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '../../../__workshop__/constants'

export default function PropsStory() {
  const content = useText('Content', 'Tooltip content')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 2, 'Props')
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useBoolean('Portal', true)
  const openDelay = useNumber('Open Delay', 200) || 0
  const closeDelay = useNumber('Close Delay', 200) || 0
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 2)

  return (
    <Card height="fill">
      <Flex
        height="fill"
        align="center"
        justify="center"
        padding={8}
        sizing="border"
        direction="column"
        gap={4}
      >
        <Stack
          padding={4}
          style={{outline: '1px solid var(--card-border-color)', width: '100%', maxWidth: '640px'}}
          space={4}
        >
          <Text align="center" size={3}>
            Standalone tooltip
          </Text>
          <Flex align="center" justify="center" padding={4} sizing="border">
            <Tooltip
              content={<Text size={1}>{content}</Text>}
              padding={padding}
              placement={placement}
              portal={portal}
              shadow={shadow}
              delay={{
                open: openDelay,
                close: closeDelay,
              }}
            >
              <Button mode="bleed" text="Hover me" />
            </Tooltip>
          </Flex>
        </Stack>
        <Stack
          padding={4}
          style={{outline: '1px solid var(--card-border-color)', width: '100%', maxWidth: '640px'}}
          space={4}
        >
          <Text align="center" size={3}>
            Grouped tooltips
          </Text>
          <Text align="center" size={1}>
            All tooltip delays are set to 1ms after the first tooltip within a DelayGroupProvider
            opens.
          </Text>
          <Flex align="center" justify="center" padding={4} sizing="border" gap={4}>
            <TooltipDelayGroupProvider
              delay={{
                open: openDelay,
                close: closeDelay,
              }}
            >
              <Tooltip
                // This is overridden by the group delay, kept here intentionally for testing purposes.
                delay={{
                  open: 100,
                  close: 100,
                }}
                content={<Text size={1}>{content}</Text>}
                padding={padding}
                placement={placement}
                portal={portal}
                shadow={shadow}
              >
                <Button mode="bleed" text="Hover me" />
              </Tooltip>
              <Tooltip
                // This is overridden by the group delay, kept here intentionally for testing purposes.
                delay={{
                  open: 100,
                  close: 100,
                }}
                content={<Text size={1}>{content}</Text>}
                padding={padding}
                placement={placement}
                portal={portal}
                shadow={shadow}
              >
                <Button mode="bleed" text="Or me" />
              </Tooltip>
            </TooltipDelayGroupProvider>
          </Flex>
        </Stack>
      </Flex>
    </Card>
  )
}
