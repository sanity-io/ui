import {Flex} from '@sanity/ui'
import {ReactElement} from 'react'

import {ZoomMenu} from '../ZoomMenu'

export default function ZoomMenuStory(): ReactElement {
  return (
    <Flex align="center" height="fill" justify="center">
      <ZoomMenu />
    </Flex>
  )
}
