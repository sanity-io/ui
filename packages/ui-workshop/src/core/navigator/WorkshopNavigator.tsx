import {SearchIcon} from '@sanity/icons'
import {Box, Card, Flex, Layer, TextInput} from '@sanity/ui'
import {memo, useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'
import {EMPTY_ARRAY} from '../constants'
import {WorkshopScope, WorkshopStory} from '../types'
import {useWorkshop} from '../useWorkshop'
import {buildMenu} from './helpers'
import {SearchResults} from './SearchResults'
import {StoryTree} from './StoryTree'
import {MenuCollection, MenuList, MenuScope} from './types'

const Root = styled(Card).attrs({display: ['none', 'none', 'block']})`
  min-width: 180px;
  max-width: 300px;
`

const flexNoneStyle: React.CSSProperties = {flex: 'none'}
const lineHeightNoneStyle: React.CSSProperties = {lineHeight: 0}
const textInputFontSize = [2, 2, 1]

/** @internal */
export const WorkshopNavigator = memo(function WorkshopNavigator(props: {
  collections?: MenuCollection[]
}): React.ReactElement {
  const {collections = []} = props
  const {broadcast, scopes} = useWorkshop()
  const menu = useMemo(() => buildMenu(collections, scopes), [collections, scopes])
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    if (!query) return EMPTY_ARRAY

    const q = query.toLowerCase()

    const ret: {scope: WorkshopScope; story: WorkshopStory}[] = []

    for (const scope of scopes) {
      for (const story of scope.stories) {
        if (scope.title.toLowerCase().includes(q) || story.title.toLowerCase().includes(q)) {
          ret.push({scope, story})
        }
      }
    }

    return ret
  }, [query, scopes])

  const handleSearchQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value),
    []
  )

  const handleSearchQueryClear = useCallback(() => setQuery(''), [])

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        broadcast({type: 'workshop/setPath', value: targetPath})

        setQuery('')
      }
    },
    [broadcast]
  )

  return (
    <NavigatorView
      matches={matches}
      menu={menu}
      onSearchQueryChange={handleSearchQueryChange}
      onSearchQueryClear={handleSearchQueryClear}
      onStoryClick={handleStoryClick}
      query={query}
    />
  )
})

const NavigatorView = memo(function NavigatorView(props: {
  matches: {scope: WorkshopScope; story: WorkshopStory}[]
  menu: MenuScope | MenuList
  onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchQueryClear: () => void
  onStoryClick: (event: React.MouseEvent<HTMLDivElement>) => void
  query: string
}) {
  const {matches, menu, onSearchQueryChange, onSearchQueryClear, onStoryClick, query} = props

  return (
    <Root borderRight flex={1} overflow="hidden">
      <Flex direction="column" height="fill">
        <Layer style={flexNoneStyle}>
          <Card padding={2} shadow={1} style={lineHeightNoneStyle}>
            <TextInput
              border={false}
              clearButton={Boolean(query)}
              fontSize={textInputFontSize}
              icon={SearchIcon}
              onChange={onSearchQueryChange}
              onClear={onSearchQueryClear}
              padding={2}
              placeholder="Stories"
              radius={2}
              space={2}
              value={query}
            />
          </Card>
        </Layer>

        <Card flex={1} overflow="auto">
          {query && matches.length > 0 && (
            <Box padding={2}>
              <SearchResults matches={matches} onStoryClick={onStoryClick} />
            </Box>
          )}

          {!query && menu.type === 'list' && (
            <Box padding={2}>
              <StoryTree items={menu.items} />
            </Box>
          )}
        </Card>
      </Flex>
    </Root>
  )
})
