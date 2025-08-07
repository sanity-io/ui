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
  // @ts-expect-error - TODO: fix this
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const gap = useSelect('Gap', WORKSHOP_SPACE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS)
  const loading = useBoolean('Loading')
  // @ts-expect-error - TODO: fix this
  const mode = useSelect('Mode', WORKSHOP_BUTTON_MODE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const paddingX = useSelect('Padding X', WORKSHOP_SPACE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const paddingY = useSelect('Padding Y', WORKSHOP_SPACE_OPTIONS)
  const selected = useBoolean('Selected')
  // @ts-expect-error - TODO: fix this
  const tone = useSelect('Tone', WORKSHOP_BUTTON_TONE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const textAlign = useSelect('Text align', WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS)
  const textProp = useText('Text', 'Label')
  // @ts-expect-error - TODO: fix this
  const textWeight = useSelect('Text weight', WORKSHOP_TEXT_WEIGHT_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center">
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
        loading={loading}
        // @ts-expect-error - TODO: fix this
        mode={mode}
        onClick={useAction('onClick')}
        // @ts-expect-error - TODO: fix this
        paddingX={paddingX}
        // @ts-expect-error - TODO: fix this
        paddingY={paddingY}
        selected={selected}
        // @ts-expect-error - TODO: fix this
        textAlign={textAlign}
        text={textProp}
        // @ts-expect-error - TODO: fix this
        textWeight={textWeight}
        // @ts-expect-error - TODO: fix this
        tone={tone}
      />
    </Flex>
  )
}
