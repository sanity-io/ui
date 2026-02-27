import {icons} from '@sanity/icons'
import {Box, Stack, Text, TextInput} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import {type PerfTestProps, usePerfTest} from '@sanity/ui-workshop/plugin-perf'
import {fireEvent} from '@testing-library/dom'

import {
  CardWrapper,
  WORKSHOP_FONT_WEIGHT_OPTIONS,
  WORKSHOP_ICON_SYMBOL_OPTIONS,
  WORKSHOP_RADIUS_OPTIONS,
  WORKSHOP_SPACE_OPTIONS,
  WORKSHOP_TEXT_FONT_SIZE_OPTIONS,
} from '$workshop'

const typingPerfTest: PerfTestProps<HTMLInputElement> = {
  name: 'typing',
  title: 'Typing',
  description: 'This test types one character at a time',
  run({target}) {
    const text = 'Hello, world & Hello, world & Hello, world'
    const len = text.length

    for (let i = 0; i < len; i += 1) {
      const value = text.slice(0, i + 1)

      fireEvent.change(target, {target: {value}})
    }
  },
}

export default function PlainStory(): React.JSX.Element {
  const {ref, Wrapper} = usePerfTest(typingPerfTest)

  return (
    <CardWrapper pattern="halftone">
      <Stack gap={3}>
        <Text as="label" htmlFor="text-input-example" size={1} weight="medium">
          TextInput
        </Text>
        <Wrapper>
          <TextInputTest inputRef={ref} />
        </Wrapper>
      </Stack>
    </CardWrapper>
  )
}

function TextInputTest(props: {inputRef: React.Ref<HTMLInputElement>}) {
  const {inputRef: ref} = props

  const border = useBoolean('Border', true)
  const customValidity = useText('Custom validity')
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  const gap = useSelect('Gap', WORKSHOP_SPACE_OPTIONS)
  const fontWeight = useSelect('Font weight', WORKSHOP_FONT_WEIGHT_OPTIONS)
  const icon = useSelect('Icon', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const iconRight = useSelect('Icon (right)', WORKSHOP_ICON_SYMBOL_OPTIONS)
  const padding = useSelect('Padding', WORKSHOP_SPACE_OPTIONS, 3)
  const placeholder = useText('Placeholder')
  const prefix = useBoolean('Prefix', false)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS)
  const readOnly = useBoolean('Read only', false)
  const suffix = useBoolean('Suffix', false)
  const value = useText('Value')

  return (
    <TextInput
      ref={ref}
      border={border}
      customValidity={customValidity}
      disabled={disabled}
      fontSize={fontSize}
      fontWeight={fontWeight}
      gap={gap}
      icon={icon && icons[icon]}
      iconRight={iconRight && icons[iconRight]}
      id="text-input-example"
      name="test"
      padding={padding}
      placeholder={placeholder}
      prefix={
        prefix && (
          <Box padding={padding}>
            <Text muted size={fontSize}>
              Prefix
            </Text>
          </Box>
        )
      }
      radius={radius}
      readOnly={readOnly}
      suffix={
        suffix && (
          <Box padding={padding}>
            <Text muted size={fontSize}>
              Suffix
            </Text>
          </Box>
        )
      }
      value={value}
      onChange={() => undefined}
    />
  )
}
