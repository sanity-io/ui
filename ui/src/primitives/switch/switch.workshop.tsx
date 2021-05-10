import {Box, Flex, Switch, Text} from '@sanity/ui'
import {defineScope, useBoolean} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'

export default defineScope('primitives/switch', 'Switch', [
  {name: 'props', title: 'Props', component: SwitchStory},
  {name: 'example', title: 'Example', component: ExampleStory},
])

function SwitchStory() {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const handleChange = useCallback(() => undefined, [])

  return (
    <div>
      <Switch
        checked={checked}
        indeterminate={indeterminate}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </div>
  )
}

function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const indeterminate = checked === undefined
  const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked)
  }, [])

  return (
    <Flex align="center" as="label">
      <Switch checked={checked || false} indeterminate={indeterminate} onChange={handleChange} />
      <Box marginLeft={3}>
        <Text size={1} weight="semibold">
          Label
        </Text>
      </Box>
    </Flex>
  )
}
