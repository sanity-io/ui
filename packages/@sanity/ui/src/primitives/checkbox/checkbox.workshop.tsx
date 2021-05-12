import {Box, Card, Checkbox, Flex, Stack, Text} from '@sanity/ui'
import {defineScope, useAction, useBoolean} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'

export default defineScope('primitives/checkbox', 'Checkbox', [
  {name: 'props', title: 'Props', component: PropsStory},
  {name: 'example', title: 'Example', component: ExampleStory},
  {name: 'read-only', title: 'Read-only', component: ReadOnlyStory},
  {name: 'multiple-tones', title: 'Multiple tones', component: MultipleTonesStory},
])

function PropsStory() {
  const checked = useBoolean('Checked', false, 'Props')
  const disabled = useBoolean('Disabled', false, 'Props')
  const indeterminate = useBoolean('Indeterminate', false, 'Props')
  const onChange = useAction('onChange')
  const onFocus = useAction('onFocus')
  const onBlur = useAction('onBlur')
  const readOnly = useBoolean('Read only', false, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readOnly}
        />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const [indeterminate] = useState(checked === undefined)
  const handleChange = useCallback(() => setChecked((val) => !val), [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked || false}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

function ReadOnlyStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox id="checkbox-example" readOnly />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}

function MultipleTonesStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack>
        <Card padding={3} tone="primary">
          <Checkbox />
        </Card>
        <Card padding={3} tone="positive">
          <Checkbox />
        </Card>
        <Card padding={3} tone="caution">
          <Checkbox />
        </Card>
        <Card padding={3} tone="critical">
          <Checkbox />
        </Card>
      </Stack>
    </Flex>
  )
}
