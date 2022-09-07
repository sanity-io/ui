import {Box, Card, Container, Heading} from '@sanity/ui'

export function ActivityPanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Heading>Activity</Heading>
        </Box>
      </Container>
    </Card>
  )
}
