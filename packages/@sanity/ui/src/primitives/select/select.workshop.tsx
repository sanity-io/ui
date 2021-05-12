import {Card, Container, Label, Select, Stack} from '@sanity/ui'
import {defineScope, useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/select', 'Select', [
  {name: 'plain', title: 'Plain', component: PlainStory},
  {name: 'read-only', title: 'Read-only', component: ReadOnlyStory},
])

function PlainStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Label as="label" htmlFor="select">
            Select
          </Label>

          <Select disabled={disabled} id="select-example" readOnly={readOnly}>
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

function ReadOnlyStory() {
  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Label as="label" htmlFor="select">
            Select
          </Label>

          <Select id="select-example" radius={3} readOnly>
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
