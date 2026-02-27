import {Card, Stack, Text} from '@sanity/ui'
import {memo} from 'react'

import type {WorkshopScope, WorkshopStory} from '../config/types'

/** @internal */
export const SearchResults = memo(function SearchResults(props: {
  matches: {scope: WorkshopScope; story: WorkshopStory}[]
  onStoryClick: (event: React.MouseEvent<HTMLDivElement>) => void
}) {
  const {matches, onStoryClick} = props

  return (
    <Stack space={1}>
      {matches.map(({scope, story}) => (
        <Card
          key={`${scope.name}/${story.name}`}
          as="a"
          data-path={`/${scope.name}/${story.name}`}
          href={`/${scope.name}/${story.name}`}
          padding={2}
          radius={2}
          onClick={onStoryClick}
        >
          <Text size={1} textOverflow="ellipsis">
            {[scope.title || '', story.title].filter(Boolean).join(' / ')}
          </Text>
        </Card>
      ))}
    </Stack>
  )
})
