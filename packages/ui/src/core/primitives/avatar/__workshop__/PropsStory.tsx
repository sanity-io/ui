import {Avatar, Box} from '@sanity/ui'
import type {AvatarSize} from '@sanity/ui/theme'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_AVATAR_SIZE_OPTIONS, WORKSHOP_AVATAR_SRC} from '$workshop'

export default function PropsStory() {
  const hideInnerStroke = useBoolean('Hide inner stroke', false)
  const src = useBoolean('With image source (src)', false)
  // @ts-expect-error - TODO: fix this
  const size = useSelect<AvatarSize>('Size', WORKSHOP_AVATAR_SIZE_OPTIONS, 1)

  return (
    <Box alignItems="center" display="flex" height="fill" justifyContent="center">
      <Avatar
        __unstable_hideInnerStroke={hideInnerStroke}
        size={size}
        src={src ? WORKSHOP_AVATAR_SRC : undefined}
      />
    </Box>
  )
}
