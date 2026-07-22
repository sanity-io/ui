import {Flex, Heading} from '@sanity/ui'
import {GroqLogo} from '../groqLogo'

export default function GroqLogoStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <GroqLogo />
      </Heading>
    </Flex>
  )
}
