import {Avatar, AVATAR_SIZE, Box} from '@sanity/ui'
import {useBoolean, useSelect, useString} from '@sanity/ui-workshop'

import {WORKSHOP_AVATAR_SRC} from '$workshop'

export default function PropsStory() {
  const hideInnerStroke = useBoolean('Hide inner stroke', false)
  const src = useBoolean('With image source (src)', false)
  const size = useSelect('Size', [undefined, ...AVATAR_SIZE])
  const arrowPosition = useSelect('Arrow position', [undefined, 'top', 'bottom', 'inside'])
  const initials = useString('Initials', 'AB')

  return (
    <Box alignItems="center" display="flex" height="fill" justifyContent="center">
      <Avatar
        __unstable_hideInnerStroke={hideInnerStroke}
        arrowPosition={arrowPosition}
        initials={initials}
        size={size}
        src={src ? WORKSHOP_AVATAR_SRC : undefined}
      />
    </Box>
  )
}
