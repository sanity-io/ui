import {Flex, Heading} from '@sanity/ui'
import {useBoolean, useWorkshop} from '@sanity/ui-workshop'
import {SanityMonogram} from '../sanityMonogram'

export default function SanityMonogramStory() {
  const isDefaultScheme = useBoolean('Use default', false)
  const {scheme: workshopScheme} = useWorkshop()

  const scheme = isDefaultScheme ? 'default' : workshopScheme

  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <SanityMonogram scheme={scheme} />
      </Heading>
    </Flex>
  )
}
