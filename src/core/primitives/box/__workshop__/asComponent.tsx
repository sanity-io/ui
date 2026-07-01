import {Box, Flex, Text} from '@sanity/ui'
import {forwardRef} from 'react'

// A custom component with its own props. When passed to `Box`'s `as` prop, these props are
// inferred on `Box` itself: `href` is required and `target` is optional, and unknown props
// are rejected by the type checker.
const Link = forwardRef(function Link(
  props: {href: string; target?: string} & Omit<
    React.HTMLProps<HTMLAnchorElement>,
    'as' | 'href' | 'target'
  >,
  ref: React.ForwardedRef<HTMLAnchorElement>,
): React.JSX.Element {
  const {children, ...restProps} = props

  return (
    <a {...restProps} ref={ref}>
      {children}
    </a>
  )
})

export default function AsComponentStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Box as={Link} href="/" padding={4} target="_new">
        <Text size={1}>As component</Text>
      </Box>
    </Flex>
  )
}
