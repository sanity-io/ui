import {Card, Container, Label, Select, Stack} from '@sanity/ui'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '$storybook/decorators'

export default {
  title: 'Atoms/Select',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const disabled = boolean('Disabled', false, 'Props')
  const readOnly = boolean('Read only', false, 'Props')

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

export const readOnly = () => {
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
