import {Flex, Heading, useTheme} from '@sanity/ui'
import {SanityLogo} from '../sanityLogo'

export default function SanityLogoStory() {
  const {dark} = useTheme().sanity.color

  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <SanityLogo dark={dark} />
      </Heading>
    </Flex>
  )
}
