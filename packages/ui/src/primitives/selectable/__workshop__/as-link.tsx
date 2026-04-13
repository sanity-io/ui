import {Selectable, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function AsLinkStory() {
  return (
    <CardWrapper>
      <Selectable as="a" href="#" padding={4}>
        <Text>Link</Text>
      </Selectable>
    </CardWrapper>
  )
}
