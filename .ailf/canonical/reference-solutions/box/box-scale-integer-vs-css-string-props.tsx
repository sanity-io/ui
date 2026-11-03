import {Box, Card, Text} from '@sanity/ui'

// Box: width/height are CSS strings ("260px"); padding is a spacing-scale integer (0-9).
// Card: no padding or radius prop — density sets padding, gap and radius together.
export function Sidebar() {
  return (
    <Box as="aside" aria-label="Filters" width="260px" padding={4} borderRight>
      <Card density="compact">
        <Text size={1}>Filters</Text>
      </Card>
    </Box>
  )
}
