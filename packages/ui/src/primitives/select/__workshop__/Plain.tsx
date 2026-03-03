import {Select, Stack, Text} from '@sanity/ui'
import {FONT_TEXT_SIZE, RADIUS} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  const border = useBoolean('Border', true)
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', FONT_TEXT_SIZE)
  const radius = useSelect('Radius', RADIUS)
  const readOnly = useBoolean('Read only', false)

  return (
    <CardWrapper width={0}>
      <Stack gap={3}>
        <Text as="label" htmlFor="select" size={1} weight="medium">
          Select
        </Text>

        <Select
          border={border}
          disabled={disabled}
          fontSize={fontSize}
          id="select-example"
          radius={radius}
          readOnly={readOnly}
        >
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
          <option value="d">Option D</option>
          <option value="e">Option E</option>
        </Select>
      </Stack>
    </CardWrapper>
  )
}
