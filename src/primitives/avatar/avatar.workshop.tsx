import {Avatar, AvatarCounter, AvatarStack, Flex} from '@sanity/ui'
import {defineScope, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {AvatarSize} from './types'

export default defineScope('primitives/avatar', 'Avatar', [
  {name: 'as-button', title: 'As button', component: AsButtonStory},
  {name: 'avatar-stack', title: 'Avatar stack', component: AvatarStackStory},
])

const AVATAR_SIZE_OPTIONS: {[key: string]: AvatarSize} = {'0 (default)': 0, '1': 1, '2': 2}

function AsButtonStory() {
  const size = useSelect('Size', AVATAR_SIZE_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Avatar as="button" color="purple" initials="uq" size={size} />
    </Flex>
  )
}

function AvatarStackStory() {
  const size = useSelect('Size', AVATAR_SIZE_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <AvatarStack size={size}>
        <AvatarCounter count={2} />
        <Avatar color="magenta" initials="uq" />
        <Avatar
          color="purple"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
        <Avatar
          color="blue"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    </Flex>
  )
}
