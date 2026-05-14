import {Container, Divider, Flex, Heading, Text} from '@sanity-labs/ui-poc'

export default function Home() {
  return (
    <Container contentSize={2} paddingY={4}>
      <Flex flexDirection="column" rowGap={2}>
        <Heading as="h1" size={4}>
          Sanity UI in Next.js
        </Heading>

        <Text>A sandbox for testing Sanity UI component installation and rendering.</Text>
      </Flex>

      <Divider marginY={5} />
    </Container>
  )
}
