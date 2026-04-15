import {CubeIcon} from '@sanity/icons'
import {ELEMENT_TONES, Menu, MenuItem} from '@sanity/ui'
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
