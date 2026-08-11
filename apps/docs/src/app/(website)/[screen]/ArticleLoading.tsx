import {Card, Text} from '@sanity/ui'

/**
 * The loading UI for the article slot. Shared by the segment's `loading.tsx`
 * and by the `<Suspense>` boundary the article pages defer their
 * `params`-dependent content behind, so both navigation types show the same
 * placeholder.
 */
export function ArticleLoading() {
  return (
    <Card data-testid="article-loading" flex={1} padding={[4, 4, 5]}>
      <Text muted size={1}>
        Loading…
      </Text>
    </Card>
  )
}
