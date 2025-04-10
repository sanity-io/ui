import {Card, Container, Label, Select, Stack} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_TEXT_FONT_SIZE_OPTIONS} from '../../../../../workshop/constants'

export default function PlainStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Label as="label" htmlFor="select">
            Select
          </Label>

          <Select disabled={disabled} fontSize={fontSize} id="select-example" readOnly={readOnly}>
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
