import {Flex, Hotkeys} from '@sanity/ui'
import {defineScope} from '@sanity/ui-workshop'
import React from 'react'

export default defineScope('components/hotkeys', 'Hotkeys', [
  {name: 'plain', title: 'Plain', component: PlainStory},
])

function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
    </Flex>
  )
}
