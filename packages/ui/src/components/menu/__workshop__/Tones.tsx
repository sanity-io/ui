import {CubeIcon} from '@sanity/icons'
import {Menu, MenuItem} from '@sanity/ui'
import {ELEMENT_TONES} from '@sanity/ui/theme'
import {useBoolean} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function TonesStory(): React.JSX.Element {
  const disabled = useBoolean('Disabled', false)

  return (
    <CardWrapper pattern="halftone" width={0}>
      <Menu>
        {ELEMENT_TONES.map((tone) => (
          <MenuItem key={tone} disabled={disabled} icon={CubeIcon} text={tone} tone={tone} />
        ))}
      </Menu>
    </CardWrapper>
  )
}
