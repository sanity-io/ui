import {Avatar, AvatarCounter, AvatarStack, Card} from '@sanity/ui'
import {select, withKnobs} from '@storybook/addon-knobs'
import React from 'react'
import {withCentered} from '~/storybook/decorators'

export default {
  title: 'Atoms/Avatar',
  decorators: [withCentered, withKnobs],
}

export const plain = () => {
  const size = select('Size', {'0 (default)': 0, '1': 1, '2': 2}, 0, 'Props')

  return (
    <Card padding={4}>
      <AvatarStack size={size}>
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
