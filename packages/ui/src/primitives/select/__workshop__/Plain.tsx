import {Select, Stack, Text} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {CardWrapper, WORKSHOP_RADIUS_OPTIONS, WORKSHOP_TEXT_FONT_SIZE_OPTIONS} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  const border = useBoolean('Border', true)
  const disabled = useBoolean('Disabled', false)
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS)
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
