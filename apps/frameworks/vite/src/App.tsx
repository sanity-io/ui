import '@sanity-labs/ui-poc/styles.css'
import {Button, Container, Divider, Flex, Heading, Text} from '@sanity-labs/ui-poc'

function App() {
  return (
    <Container contentSize={2} paddingY={4}>
      <Flex flexDirection="column" rowGap={2}>
        <Heading as="h1" size={4}>
          Sanity UI in Vite
        </Heading>

        <Text>A sandbox for testing Sanity UI component installation and rendering.</Text>
      </Flex>

      <Divider marginY={5} />

      <Button as="a" text="Test Button" href="/test" />
    </Container>
  )
}

export default App
