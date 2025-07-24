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
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2)
  const gap = useSelect('Gap', WORKSHOP_SPACE_OPTIONS, 3)
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS, 'add-circle')
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS, 'center')
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS, 'default')
  const onClick = useAction('onClick')
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS, 3)
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
                  fontSize={fontSize}
                  gap={gap}
                  icon={icon && icons[icon]}
                  iconRight={iconRight && icons[iconRight]}
                  justify={justify}
                  key={tone}
                  mode={mode}
                  onClick={onClick}
                  paddingX={paddingX}
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
