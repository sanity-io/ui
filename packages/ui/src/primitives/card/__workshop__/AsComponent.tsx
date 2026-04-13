import {Card, Flex, Text} from '@sanity/ui'

function CustomLink(
  props: {req: string} & Omit<React.HTMLProps<HTMLAnchorElement>, 'as' | 'href'>,
): React.JSX.Element {
  const {children, req, ...rest} = props

  return (
    <a data-required={req} {...rest}>
      {children}
    </a>
  )
}

export default function AsComponentStory(): React.JSX.Element {
  const props = {href: '#'}

  return (
    <Flex align="center" height="fill" justify="center">
      <Card as={CustomLink} data-as="a" {...props} padding={3} req="1">
        <Text size={1}>As component</Text>
      </Card>
    </Flex>
  )
}
