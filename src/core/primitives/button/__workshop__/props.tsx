import {icons} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  WORKSHOP_BUTTON_MODE_OPTIONS,
  WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS,
  WORKSHOP_BUTTON_TONE_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
  WORKSHOP_TEXT_WEIGHT_OPTIONS,
} from '$workshop'

export default function ButtonStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  const gap = useSelect('Gap', WORKSHOP_SPACE_OPTIONS)
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS)
  const loading = useBoolean('Loading')
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS)
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS)
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS)
  const selected = useBoolean('Selected')
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS)
  const textAlign = useSelect('Text align', WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS)
  const textProp = useText('Text', 'Label')
  const textWeight = useSelect('Text weight', WORKSHOP_TEXT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        disabled={disabled}
        fontSize={fontSize}
        gap={gap}
        icon={icon && icons[icon]}
        iconRight={iconRight && icons[iconRight]}
        justify={justify}
        loading={loading}
        mode={mode}
        onClick={useAction('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        selected={selected}
        textAlign={textAlign}
        text={textProp}
        textWeight={textWeight}
        tone={tone}
      />
    </Flex>
  )
}
