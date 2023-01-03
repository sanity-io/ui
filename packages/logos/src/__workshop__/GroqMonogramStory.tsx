import {Flex, Heading} from '@sanity/ui'
import {GroqMonogram} from '../groqMonogram'

export default function GroqMonogramStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <GroqMonogram />
      </Heading>
    </Flex>
  )
}
