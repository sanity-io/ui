import {Tree, TreeItem} from '@sanity/ui'
import {memo, useCallback, useMemo} from 'react'
import {WorkshopStory} from '../types'
import {useWorkshop} from '../useWorkshop'
import {MenuList, MenuScope} from './types'

/** @internal */
export const StoryTree = memo(function StoryTree(props: {items: Array<MenuList | MenuScope>}) {
  const {items} = props

  return (
    <Tree space={1}>
      <MenuItems items={items} />
    </Tree>
  )
})

const MenuItems = memo(function MenuItems(props: {
  basePath?: string
  items: Array<MenuList | MenuScope>
}) {
  const {basePath = '', items} = props
  const {broadcast, path: workshopPath, scope: currentScope, story: currentStory} = useWorkshop()

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        broadcast({type: 'workshop/setPath', value: targetPath})
      }
    },
    [broadcast]
  )

  return useMemo(() => {
    if (items.length === 0) {
      return null
    }

    return (
      <>
        {items.map((item, itemIndex) => {
          if (item.type === 'list') {
            const path = `${basePath}/${item.name}`

            return (
              <MemoList
                expanded={workshopPath.startsWith(path + '/')}
                key={item.name || itemIndex}
                item={item}
                path={path}
              />
            )
          }

          if (item.type === 'scope') {
            return (
              <MemoScope
                currentStory={currentStory}
                expanded={item.scope === currentScope}
                item={item}
                key={item.name}
                onStoryClick={handleStoryClick}
              />
            )
          }

          return <TreeItem key={itemIndex} text="unknown" />
        })}
      </>
    )
  }, [basePath, currentScope, currentStory, handleStoryClick, items, workshopPath])
})

const MemoList = memo(function MemoList(props: {expanded: boolean; item: MenuList; path: string}) {
  const {expanded, item, path} = props

  const children = useMemo(() => <MenuItems basePath={path} items={item.items} />, [item, path])

  return (
    <TreeItem expanded={expanded} fontSize={1} padding={2} text={item.title} weight="semibold">
      {children}
    </TreeItem>
  )
})

const MemoScope = memo(function MemoScope(props: {
  currentStory: WorkshopStory | null
  expanded: boolean
  item: MenuScope
  onStoryClick: (event: React.MouseEvent<HTMLLIElement>) => void
}) {
  const {currentStory, expanded, item, onStoryClick} = props

  const children = useMemo(
    () =>
      item.scope.stories.map((story) => (
        <TreeItem
          data-path={`/${item.scope.name}/${story.name}`}
          fontSize={1}
          href={`/${item.scope.name}/${story.name}`}
          key={story.name}
          onClick={onStoryClick}
          padding={2}
          selected={currentStory === story}
          text={story.title}
        />
      )),
    [currentStory, item, onStoryClick]
  )

  return (
    <TreeItem expanded={expanded} fontSize={1} padding={2} text={item.title} weight="semibold">
      {children}
    </TreeItem>
  )
})
