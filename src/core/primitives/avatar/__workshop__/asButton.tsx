import {Avatar, Flex} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_AVATAR_SIZE_OPTIONS} from '$workshop'

export default function AsButtonStory(): React.JSX.Element {
  // @ts-expect-error - TODO: fix this
  const size = useSelect('Size', WORKSHOP_AVATAR_SIZE_OPTIONS, 1)

  return (
    <Flex align="center" height="fill" justify="center">
      <Avatar
        as="button"
        color="purple"
        initials="uq"
        // @ts-expect-error - TODO: fix this
        size={size}
      />
    </Flex>
  )
}
