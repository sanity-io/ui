import {Card, Flex, Text} from '@sanity/ui'

export default function StyledCardStory(): React.JSX.Element {
  return (
    <Flex align="center" height="fill" justify="center">
      <Card as="ol">
        <Text as="li">Styled</Text>
      </Card>
    </Flex>
  )
}
