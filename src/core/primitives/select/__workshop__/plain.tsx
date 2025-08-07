import {Card, Container, Label, Select, Stack} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_RADIUS_OPTIONS, WORKSHOP_TEXT_FONT_SIZE_OPTIONS} from '$workshop'

export default function PlainStory(): React.JSX.Element {
  const border = useBoolean('Border', true)
  const disabled = useBoolean('Disabled', false)
  // @ts-expect-error - TODO: fix this
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS)
  // @ts-expect-error - TODO: fix this
  const radius = useSelect('Radius', WORKSHOP_RADIUS_OPTIONS)
  const readOnly = useBoolean('Read only', false)

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack gap={3}>
          <Label as="label" htmlFor="select">
            Select
          </Label>

          <Select
            border={border}
            disabled={disabled}
            // @ts-expect-error - TODO: fix this
            fontSize={fontSize}
            id="select-example"
            // @ts-expect-error - TODO: fix this
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
      </Card>
    </Container>
  )
}
