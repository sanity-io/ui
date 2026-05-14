import {Container, Divider, Flex, Heading, Text} from '@sanity-labs/ui-poc'

import '@sanity-labs/ui-poc/styles.css'

export function Welcome() {
  return (
    <Container contentSize={2} paddingY={4}>
      <Flex flexDirection="column" rowGap={2}>
        <Heading as="h1" size={4}>
          Sanity UI in React Router
        </Heading>

        <Text>A sandbox for testing Sanity UI component installation and rendering.</Text>
      </Flex>

      <Divider marginY={5} />
    </Container>
  )
}
