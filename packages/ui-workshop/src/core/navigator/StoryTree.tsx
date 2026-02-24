import {Tree, TreeItem} from '@sanity/ui'
import {useCallback, useMemo} from 'react'

import type {WorkshopStory} from '../config/types'
import {useWorkshop} from '../useWorkshop'
import type {MenuList, MenuScope, MenuStory} from './types'

/** @internal */
export function StoryTree(props: {items: Array<MenuList | MenuScope | MenuStory>}) {
  const {items} = props

  return (
    <Tree gap={1}>
      <StoryTreeMenuItems items={items} />
    </Tree>
  )
}

function StoryTreeMenuItems(props: {
  basePath?: string
  items: Array<MenuList | MenuScope | MenuStory>
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
    [broadcast],
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
              <StoryTreeList
                key={item.name ?? itemIndex}
                expanded={workshopPath.startsWith(path + '/')}
                item={item}
                path={path}
              />
            )
          }

          if (item.type === 'story') {
            return (
              <TreeItem
                key={item.name}
                data-path={`/${item.name ?? ''}`}
                fontSize={[2, 2, 1]}
                href={`/${item.name ?? ''}`}
                padding={2}
                selected={currentStory?.component === item.component}
                text={item.title}
                onClick={handleStoryClick}
              />
            )
          }

          if (item.type === 'scope') {
            return (
              <StoryTreeScope
                currentStory={currentStory}
                expanded={item.scope === currentScope}
                item={item}
                onStoryClick={handleStoryClick}
              />
            )
          }

          return <TreeItem key={itemIndex} text="unknown" />
        })}
      </>
    )
  }, [basePath, currentScope, currentStory, handleStoryClick, items, workshopPath])
}

function StoryTreeList(props: {expanded: boolean; item: MenuList; path: string}) {
  const {expanded, item, path} = props

  const children = useMemo(
    () => <StoryTreeMenuItems basePath={path} items={item.items} />,
    [item, path],
  )

  return (
    <TreeItem
      expanded={expanded}
      fontSize={[2, 2, 1]}
      padding={2}
      text={item.title}
      weight="semibold"
    >
      {children}
    </TreeItem>
  )
}

function StoryTreeScope(props: {
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
          key={story.name}
          data-path={`/${item.scope.name}/${story.name}`}
          fontSize={[2, 2, 1]}
          href={`/${item.scope.name}/${story.name}`}
          padding={2}
          selected={currentStory === story}
          text={story.title}
          onClick={onStoryClick}
        />
      )),
    [currentStory, item, onStoryClick],
  )

  return (
    <TreeItem
      expanded={expanded}
      fontSize={[2, 2, 1]}
      padding={2}
      text={item.title}
      weight="semibold"
    >
      {children}
    </TreeItem>
  )
}
