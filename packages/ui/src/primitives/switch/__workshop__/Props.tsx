import {Switch} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {useCallback} from 'react'

import {CardWrapper} from '$workshop'

export default function PropsStory(): React.JSX.Element {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const handleChange = useCallback(() => undefined, [])

  return (
    <CardWrapper alignItems="center" display="flex" justifyContent="center">
      <Switch
        checked={checked}
        indeterminate={indeterminate}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </CardWrapper>
  )
}
