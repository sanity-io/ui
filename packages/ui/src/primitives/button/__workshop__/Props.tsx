import {icons} from '@sanity/icons'
import {Button, Flex, type TooltipProps} from '@sanity/ui'
import {BUTTON_MODES, ELEMENT_TONES, FONT_TEXT_SIZE, FONT_WEIGHT, SPACE} from '@sanity/ui/tokens'
import {useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'

import {
  CardWrapper,
  WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS,
  WORKSHOP_FLEX_JUSTIFY_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
} from '$workshop'

export default function ButtonStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled')
  const fontSize = useSelect('Font size', [undefined, ...FONT_TEXT_SIZE])
  const gap = useSelect('Gap', [undefined, ...SPACE])
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const justify = useSelect('Justify', WORKSHOP_FLEX_JUSTIFY_OPTIONS)
  const loading = useBoolean('Loading')
  const mode = useSelect('Mode', [undefined, ...BUTTON_MODES])
  const paddingX = useSelect('Padding X', [undefined, ...SPACE])
  const paddingY = useSelect('Padding Y', [undefined, ...SPACE])
  const selected = useBoolean('Selected')
  const tone = useSelect('Tone', [undefined, ...ELEMENT_TONES])
  const textAlign = useSelect('Text align', WORKSHOP_BUTTON_TEXT_ALIGN_OPTIONS)
  const textProp = useText('Text', 'Text')
  const textWeight = useSelect('Text weight', [undefined, ...FONT_WEIGHT])
  const tooltip = useText('Tooltip text', 'Tooltip')

  return (
    <CardWrapper width={0}>
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
          paddingX={paddingX}
          paddingY={paddingY}
          selected={selected}
          text={textProp}
          textAlign={textAlign}
          textWeight={textWeight}
          tone={tone}
          tooltip={
            tooltip
              ? ({hotkeys: ['⌘', 'K'], id: 'test-button-tooltip', text: tooltip} as TooltipProps)
              : undefined
          }
          onClick={useAction('onClick')}
        />
      </Flex>
    </CardWrapper>
  )
}
