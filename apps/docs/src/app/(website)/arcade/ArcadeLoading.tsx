import {Card, Text} from '@sanity/ui'

export function ArcadeLoading() {
  return (
    <Card data-testid="arcade-loading" flex={1} padding={[4, 4, 5]}>
      <Text muted size={1}>
        Loading…
      </Text>
    </Card>
  )
}
