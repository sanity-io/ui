import {InlineCode, Text} from '@sanity/ui'

import {CardWrapper} from '$workshop'

export default function InlineCodeStory() {
  return (
    <CardWrapper pattern="halftone" width={0}>
      <Text align="center" size={1}>
        Use the <InlineCode language="jsx">{`<Box>`}</InlineCode> component to build layouts.
      </Text>
    </CardWrapper>
  )
}
