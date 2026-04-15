import {Avatar, AVATAR_SIZE, Flex} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'

export default function AsButtonStory(): React.JSX.Element {
  const size = useSelect('Size', AVATAR_SIZE, 2)

  return (
    <Flex align="center" height="fill" justify="center">
      <Avatar as="button" color="magenta" initials="ab" size={size} />
    </Flex>
  )
}
