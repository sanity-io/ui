import {Flex} from '@sanity/ui'
import {ReactElement} from 'react'
import {ViewportMenu} from '../ViewportMenu'

export default function ViewportMenuStory(): ReactElement {
  return (
    <Flex align="center" height="fill" justify="center">
      <ViewportMenu />
    </Flex>
  )
}
