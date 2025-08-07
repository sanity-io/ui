import {icons} from '@sanity/icons'
import {Box, Button, Card, Container, Flex, Stack} from '@sanity/ui'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'

import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '$workshop'

export default function StackedStory(): React.JSX.Element {
  const tones = Object.entries(WORKSHOP_BUTTON_TONE_OPTIONS)
  const disabled = useBoolean('Disabled', false)
  // @ts-expect-error - TODO: fix this
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2)
  // @ts-expect-error - TODO: fix this
  const gap = useSelect('Gap', WORKSHOP_SPACE_OPTIONS, 3)
  // @ts-expect-error - TODO: fix this
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, 'add-circle')
  // @ts-expect-error - TODO: fix this
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS, 'center')
  // @ts-expect-error - TODO: fix this
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS, 'default')
  const onClick = useAction('onClick')
  // @ts-expect-error - TODO: fix this
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 3)
  // @ts-expect-error - TODO: fix this
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS, 3)
  const selected = useBoolean('Selected', false)

  return (
    <Card height="fill">
      <Flex align="center" height="fill" justify="center">
        <Container width={0} style={{textAlign: 'center'}}>
          <Box padding={4}>
            <Stack gap={1}>
              {tones.map(([title, tone]) => (
                <Button
                  disabled={disabled}
                  // @ts-expect-error - TODO: fix this
                  fontSize={fontSize}
                  // @ts-expect-error - TODO: fix this
                  gap={gap}
                  // @ts-expect-error - TODO: fix this
                  icon={icon && icons[icon]}
                  // @ts-expect-error - TODO: fix this
                  iconRight={iconRight && icons[iconRight]}
                  // @ts-expect-error - TODO: fix this
                  justify={justify}
                  key={tone}
                  // @ts-expect-error - TODO: fix this
                  mode={mode}
                  onClick={onClick}
                  // @ts-expect-error - TODO: fix this
                  paddingX={paddingX}
                  // @ts-expect-error - TODO: fix this
                  paddingY={paddingY}
                  selected={selected}
                  text={title}
                  tone={tone}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Flex>
    </Card>
  )
}
