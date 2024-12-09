import {Flex} from '@sanity/ui'

import {ZoomMenu} from '../ZoomMenu'

export default function ZoomMenuStory(): React.ReactNode {
  return (
    <Flex align="center" height="fill" justify="center">
      <ZoomMenu />
    </Flex>
  )
}
