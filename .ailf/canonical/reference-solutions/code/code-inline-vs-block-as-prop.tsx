import {Code, Text} from '@sanity/ui'

// Default Code is a <pre> block; use as="span" for inline code within text.
export function InlineRef() {
  return (
    <Text size={1}>
      Call{' '}
      <Code as="span" size={1}>
        useSanityQuery()
      </Code>{' '}
      to fetch data.
    </Text>
  )
}
