import {Box, Card, Container, Text} from '@sanity/ui'

export function DashboardTool() {
  return (
    <Container width={3}>
      <Box padding={4}>
        <Card padding={4} radius={3} shadow={1}>
          <Text>DashboardTool</Text>
        </Card>
      </Box>
    </Container>
  )
}
