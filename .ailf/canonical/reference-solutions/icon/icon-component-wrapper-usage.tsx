import {SearchIcon} from '@sanity/icons/Search'
import {Flex, Heading, Icon} from '@sanity/ui'

// Glyph passed into the Icon component via the `icon` prop; size is a scale integer (0–4).
export function SearchHeader() {
  return (
    <Flex alignItems="center" gap={2}>
      <Icon icon={SearchIcon} size={3} />
      <Heading as="h2" size={2}>
        Search
      </Heading>
    </Flex>
  )
}
