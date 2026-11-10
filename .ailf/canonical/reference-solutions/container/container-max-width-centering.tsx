import {Container, Text} from '@sanity/ui'

// size caps max-width (scale 0–5); Container centers via marginX="auto" by default.
export function ReadingColumn() {
  return (
    <Container size={2}>
      <Text size={2}>This column is capped and centered on wide screens.</Text>
    </Container>
  )
}
