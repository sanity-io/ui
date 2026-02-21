import {TextInput} from '@sanity/ui'
import {useText} from '@sanity/ui-workshop'

import {CardWrapper} from '../../../../../workshop'

export default function ReadOnlyStory(): React.JSX.Element {
  const value = useText('Value', 'This is some text')

  return (
    <CardWrapper>
      <TextInput id="text-input-example" readOnly value={value} />
    </CardWrapper>
  )
}
