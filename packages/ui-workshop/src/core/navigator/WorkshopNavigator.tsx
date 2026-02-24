import {SearchIcon} from '@sanity/icons'
import {Box, Card, Flex, Layer, TextInput, Tree} from '@sanity/ui'
import {useCallback, useMemo, useState} from 'react'

import type {WorkshopCollection, WorkshopScope, WorkshopStory} from '../config/types'
import {EMPTY_ARRAY} from '../constants'
import {useWorkshop} from '../useWorkshop'
import {buildMenu} from './menu'
import {SearchResults} from './SearchResults'
import {StoryTreeItems} from './StoryTree'
import {root} from './WorkshopNavigator.css'

/** @internal */
export function WorkshopNavigator(props: {collections?: WorkshopCollection[]; expanded: boolean}) {
  const {collections = [], expanded} = props
  const {broadcast, scopes} = useWorkshop()
  const menu = useMemo(() => buildMenu(collections, scopes), [collections, scopes])
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    if (!query) return EMPTY_ARRAY

    const q = query.toLowerCase()

    const ret: {scope: WorkshopScope; story: WorkshopStory}[] = []

    for (const scope of scopes) {
      for (const story of scope.stories) {
        if (scope.title?.toLowerCase().includes(q) || story.title.toLowerCase().includes(q)) {
          ret.push({scope, story})
        }
      }
    }

    return ret
  }, [query, scopes])

  const handleSearchQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value),
    [],
  )

  const handleSearchQueryClear = useCallback(() => setQuery(''), [])

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        broadcast({type: 'workshop/setPath', value: targetPath})
        setQuery('')
      }
    },
    [broadcast],
  )

  return (
    <Layer
      className={root}
      display={expanded ? ['block'] : ['none', 'none', 'block']}
      flex={1}
      overflow={['hidden', 'hidden', 'auto']}
      shadow={1}
    >
      <Flex direction="column" height="fill">
        <Layer flex="none">
          <Card padding={3} shadow={1}>
            <TextInput
              border={false}
              clearButton={Boolean(query)}
              fontSize={1}
              icon={SearchIcon}
              padding={2}
              placeholder="Stories"
              value={query}
              onChange={handleSearchQueryChange}
              onClear={handleSearchQueryClear}
            />
          </Card>
        </Layer>

        {query && matches.length > 0 && (
          <Box flex={1} overflow="auto" padding={3}>
            <SearchResults matches={matches} onStoryClick={handleStoryClick} />
          </Box>
        )}

        {!query && menu.type === 'list' && (
          <Tree flex={1} gap={1} overflow="auto" padding={3}>
            <StoryTreeItems items={menu.items} />
          </Tree>
        )}
      </Flex>
    </Layer>
  )
}
