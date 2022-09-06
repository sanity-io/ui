import {Box, Card, Container, Heading} from '@sanity/ui'

export function BillingPanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Heading>Billing</Heading>
        </Box>
      </Container>
    </Card>
  )
}
