import {Button, Card, Stack, Text, Tooltip, TooltipDelayGroupProvider} from '@sanity/ui'
import {useBoolean, useNumber, useSelect, useText} from '@sanity/ui-workshop'

import {
  CardWrapper,
  WORKSHOP_PLACEMENT_OPTIONS,
  WORKSHOP_SHADOW_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const arrow = useBoolean('Arrow', false)
  const content = useText('Content', 'Tooltip content')
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 2)
  const placement = useSelect('Placement', WORKSHOP_PLACEMENT_OPTIONS, 'top')
  const portal = useBoolean('Portal', true)
  const openDelay = useNumber('Open Delay', 500)
  const closeDelay = useNumber('Close Delay', 100)
  const shadow = useSelect('Shadow', WORKSHOP_SHADOW_OPTIONS, 2)

  return (
    <CardWrapper gap={[5, 6]} pattern="halftone">
      <Stack gap={4}>
        <Stack gap={3}>
          <Text size={1} weight="medium">
            Single tooltip
          </Text>
        </Stack>

        <Card display="flex" gap={4} justifyContent="center" padding={4} radius={4} shadow={1}>
          <Tooltip
            arrow={arrow}
            delay={{
              open: openDelay,
              close: closeDelay,
            }}
            padding={padding}
            placement={placement}
            portal={portal}
            shadow={shadow}
            text={content}
          >
            <Button mode="bleed" text="Hover me" />
          </Tooltip>
        </Card>
      </Stack>

      {/* GROUPED TOOLTIPS */}

      <Stack gap={4}>
        <Stack gap={3}>
          <Text size={1} weight="medium">
            Grouped tooltips
          </Text>
          <Text muted size={1}>
            All tooltip delays are set to 1ms after the first tooltip within a DelayGroupProvider
            opens.
          </Text>
        </Stack>

        <Card display="flex" gap={4} justifyContent="center" padding={4} radius={4} shadow={1}>
          <TooltipDelayGroupProvider
            delay={{
              open: openDelay,
              close: closeDelay,
            }}
          >
            <Tooltip
              arrow={arrow}
              content={<Text size={1}>{content}</Text>}
              // This is overridden by the group delay, kept here intentionally for testing purposes.
              delay={{
                open: 100,
                close: 100,
              }}
              padding={padding}
              placement={placement}
              portal={portal}
              shadow={shadow}
            >
              <Button mode="bleed" text="Hover me" />
            </Tooltip>
            <Tooltip
              arrow={arrow}
              content={<Text size={1}>{content}</Text>}
              // This is overridden by the group delay, kept here intentionally for testing purposes.
              delay={{
                open: 100,
                close: 100,
              }}
              padding={padding}
              placement={placement}
              portal={portal}
              shadow={shadow}
            >
              <Button mode="bleed" text="Or me" />
            </Tooltip>
          </TooltipDelayGroupProvider>
        </Card>
      </Stack>
    </CardWrapper>
  )
}
