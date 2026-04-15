import {Avatar, AVATAR_SIZE, AvatarCounter, AvatarStack, Box} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

import {CardWrapper} from '$workshop'

export default function StackStory(): React.JSX.Element {
  const size = useSelect('Size', [undefined, ...AVATAR_SIZE])

  return (
    <CardWrapper gap={4}>
      <Box display="flex" justifyContent="center">
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
      </Box>
    </CardWrapper>
  )
}
