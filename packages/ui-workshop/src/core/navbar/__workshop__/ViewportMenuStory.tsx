import {Flex} from '@sanity/ui'

import {ViewportMenu} from '../ViewportMenu'

export default function ViewportMenuStory(): React.ReactNode {
  return (
    <Flex align="center" height="fill" justify="center">
      <ViewportMenu />
    </Flex>
  )
}
