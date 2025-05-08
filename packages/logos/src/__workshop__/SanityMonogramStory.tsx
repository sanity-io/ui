import {Flex, Heading, useTheme} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import {SanityMonogram} from '../sanityMonogram'

export default function SanityMonogramStory() {
  const isDefaultScheme = useBoolean('Use default', false)
  const {dark} = useTheme().sanity.color

  const scheme = isDefaultScheme ? 'default' : dark ? 'dark' : 'light'

  return (
    <Flex align="center" height="fill" justify="center" padding={5} sizing="border">
      <Heading size={5}>
        <SanityMonogram scheme={scheme} />
      </Heading>
    </Flex>
  )
}
