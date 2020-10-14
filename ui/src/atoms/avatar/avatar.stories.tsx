import {Avatar, AvatarCounter, AvatarStack, Card} from '@sanity/ui'
import {withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Avatar',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  return (
    <Card padding={4}>
      <AvatarStack>
        <AvatarCounter count={2} />
        <Avatar color="red" initials="uq" />
        <Avatar
          color="green"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
        <Avatar
          color="blue"
          src="https://avatars3.githubusercontent.com/u/406933?s=400&u=af898b0a50ef2ef1248be32dfa1410ccb55f6f65&v=4"
        />
      </AvatarStack>
    </Card>
  )
}
