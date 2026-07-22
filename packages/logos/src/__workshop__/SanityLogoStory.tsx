import {Flex, Heading} from '@sanity/ui'
import {useWorkshop} from '@sanity/ui-workshop'
import {SanityLogo} from '../sanityLogo'

export default function SanityLogoStory() {
  const dark = useWorkshop().scheme === 'dark'

  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <SanityLogo dark={dark} />
      </Heading>
    </Flex>
  )
}
