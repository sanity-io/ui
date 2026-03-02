import {icons} from '@sanity/icons'
import {Box, Button, Container, Flex, Stack} from '@sanity/ui'
import {BUTTON_MODES, ELEMENT_TONES, FONT_TEXT_SIZE, SPACE} from '@sanity/ui/theme'
import {useAction, useBoolean, useSelect} from '@sanity/ui-workshop'

import {CardWrapper, WORKSHOP_FLEX_JUSTIFY_OPTIONS, WORKSHOP_ICON_SYMBOL_OPTIONS} from '$workshop'

export default function StackedStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', FONT_TEXT_SIZE)
  const gap = useSelect('Gap', SPACE)
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS)
  const mode = useSelect('Mode', BUTTON_MODES)
  const onClick = useAction('onClick')
  const paddingX = useSelect('Padding X', SPACE)
  const paddingY = useSelect('Padding Y', SPACE)
  const selected = useBoolean('Selected', false)

  return (
    <CardWrapper>
      <Flex align="center" height="fill" justify="center">
        <Container style={{textAlign: 'center'}} width={0}>
          <Box padding={4}>
            <Stack gap={1}>
              {ELEMENT_TONES.map((tone) => (
                <Button
                  key={tone}
                  disabled={disabled}
                  fontSize={fontSize}
                  gap={gap}
                  icon={icon && icons[icon]}
                  iconRight={iconRight && icons[iconRight]}
                  justify={justify}
                  mode={mode}
                  paddingX={paddingX}
                  paddingY={paddingY}
                  selected={selected}
                  text={tone}
                  tone={tone}
                  onClick={onClick}
                />
              ))}
            </Stack>
          </Box>
        </Container>
      </Flex>
    </CardWrapper>
  )
}
