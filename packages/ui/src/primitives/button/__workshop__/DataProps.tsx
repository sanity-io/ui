import {Button} from '@sanity/ui'
import {BUTTON_MODES, ELEMENT_TONES} from '@sanity/ui/theme'
import {useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function DataPropsStory(): React.JSX.Element {
  const mode = useSelect('Mode', [undefined, ...BUTTON_MODES], 'default')
  const tone = useSelect('Tone', [undefined, ...ELEMENT_TONES], 'default')

  return (
    <CardWrapper gap={3}>
      <Button data-enabled="" mode={mode} text="Button" tone={tone} />
      <Button data-hovered="" mode={mode} text="Button" tone={tone} />
      <Button data-pressed="" mode={mode} text="Button" tone={tone} />
      <Button data-selected="" mode={mode} text="Button" tone={tone} />
    </CardWrapper>
  )
}
