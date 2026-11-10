import {Card, Grid} from '@sanity/ui'

// v3 `columns={[1, 1, 2, 3]}` → v5 has no `columns` prop. gridTemplateColumns takes CSS
// grid strings, and the array positions are the same breakpoints as before:
//   [0] base (320px up) · [1] 360px · [2] 600px · [3] 900px
// Every slot is written out rather than skipped, so each breakpoint has an explicit value.
export function CardGrid({items}: {items: {id: string; title: string}[]}) {
  return (
    <Grid gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={3}>
      {items.map((item) => (
        <Card key={item.id}>{item.title}</Card>
      ))}
    </Grid>
  )
}
