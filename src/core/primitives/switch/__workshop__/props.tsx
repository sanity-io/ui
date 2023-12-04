import {Flex, Switch} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {useCallback} from 'react'

export default function PropsStory() {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const handleChange = useCallback(() => undefined, [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Switch
        checked={checked}
        indeterminate={indeterminate}
        onChange={handleChange}
        readOnly={readOnly}
      />
    </Flex>
  )
}
