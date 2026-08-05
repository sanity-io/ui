import '@sanity/ui/styles.css'
import {Button, Container, Divider, Flex, Heading, Text} from '@sanity/ui'

function App() {
  return (
    <Container size={2} paddingY={4}>
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
