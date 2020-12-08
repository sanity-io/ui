import {Card, Container, Label, Select, Stack} from '@sanity/ui'
import {boolean, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Select',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const disabled = boolean('Disabled', false, 'Props')

  return (
    <Container width={0}>
      <Card padding={4}>
        <Stack space={3}>
          <Label as="label" htmlFor="select">
            Select
          </Label>

          <Select disabled={disabled} id="select" radius={3}>
            <option>Test</option>
            <option>Test asdadsas d</option>
            <option>Test asd asda</option>
            <option>Testasd asdasd asd</option>
            <option>Test asd asddasd</option>
          </Select>
        </Stack>
      </Card>
    </Container>
  )
}
