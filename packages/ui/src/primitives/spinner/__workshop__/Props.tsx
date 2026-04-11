import {Flex, Spinner} from '@sanity/ui'
import {useBoolean, useSelect} from '@sanity/ui-workshop'

import {WORKSHOP_TEXT_FONT_SIZE_OPTIONS} from '$workshop'

export default function Props(): React.JSX.Element {
  const muted = useBoolean('Muted', false)
  // @ts-expect-error - TODO: fix this
  const size = useSelect('Size', WORKSHOP_TEXT_FONT_SIZE_OPTIONS, 2)

  return (
    <Flex align="center" height="fill" justify="center">
      <Spinner
        muted={muted}
        // @ts-expect-error - TODO: fix this
        size={size}
      />
    </Flex>
  )
}
