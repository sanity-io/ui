import {Flex, Heading} from '@sanity/ui'
import {SanityMonogram} from '../sanityMonogram'

export default function SanityMonogramStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <SanityMonogram />
      </Heading>
    </Flex>
  )
}
