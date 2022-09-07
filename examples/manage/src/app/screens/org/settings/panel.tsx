import {Box, Card, Container, Heading} from '@sanity/ui'

export function SettingsPanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Heading>Settings</Heading>
        </Box>
      </Container>
    </Card>
  )
}
