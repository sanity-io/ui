import {Card, Stack, Text} from '@sanity/ui'
import {memo} from 'react'
import {WorkshopScope, WorkshopStory} from '../config'

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
          as="a"
          data-path={`/${scope.name}/${story.name}`}
          href={`/${scope.name}/${story.name}`}
          key={`${scope.name}/${story.name}`}
          onClick={onStoryClick}
          padding={2}
          radius={2}
        >
          <Text size={1} textOverflow="ellipsis" weight="semibold">
            {scope.title} / {story.title}
          </Text>
        </Card>
      ))}
    </Stack>
  )
})
