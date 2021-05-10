import {Flex, KBD} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('primitives/kbd', 'KBD', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <KBD style={{verticalAlign: 'top'}}>Ctrl</KBD>
    </Flex>
  )
}
