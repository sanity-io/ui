import {Box, Flex, Container, Card} from '@sanity/ui'

// Container wraps the content area only — not the sidebar or toolbar (app chrome).
// It goes INSIDE the scroll Box; the Box owns flexGrow/overflow.
export function Page() {
  return (
    <Flex minHeight="100vh">
      <Box as="nav" width="260px" borderRight padding={3} />
      <Flex as="main" flexDirection="column" flexGrow={1}>
        <Box padding={3} borderBottom />
        <Box padding={4} flexGrow={1} overflowY="auto">
          <Container size={2}>
            <Card>Content list</Card>
          </Container>
        </Box>
      </Flex>
    </Flex>
  )
}
