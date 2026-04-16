import {TreeItem} from '@sanity/ui'
import {useCallback} from 'react'

import {useWorkshop} from '../useWorkshop'
import type {MenuList, MenuScope, MenuStory} from './types'

export function StoryTreeItems(props: {
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

  if (items.length === 0) {
    return null
  }

  return (
    <>
      {items.map((item, itemIndex) => {
        if (item.type === 'list') {
          const path = `${basePath}/${item.name}`

          return (
            <TreeItem
              key={item.name}
              expanded={workshopPath.startsWith(path + '/')}
              fontSize={1}
              padding={2}
              text={item.title}
              weight="medium"
            >
              <StoryTreeItems basePath={path} items={item.items} />
            </TreeItem>
          )
        }

        if (item.type === 'story') {
          return (
            <TreeItem
              key={item.name}
              data-path={`/${item.name ?? ''}`}
              fontSize={1}
              href={`/${item.name ?? ''}`}
              muted
              padding={2}
              selected={currentStory?.component === item.component}
              text={item.title}
              weight="regular"
              onClick={handleStoryClick}
            />
          )
        }

        if (item.type === 'scope') {
          return (
            <TreeItem
              key={item.name}
              expanded={item.scope === currentScope}
              fontSize={1}
              padding={2}
              text={item.title}
              weight="medium"
            >
              {item.scope.stories.map((story) => (
                <TreeItem
                  key={story.name}
                  data-path={`/${item.scope.name}/${story.name}`}
                  fontSize={1}
                  href={`/${item.scope.name}/${story.name}`}
                  muted
                  padding={2}
                  selected={currentStory === story}
                  text={story.title}
                  weight="regular"
                  onClick={handleStoryClick}
                />
              ))}
            </TreeItem>
          )
        }

        return <TreeItem key={itemIndex} text="unknown" />
      })}
    </>
  )
}
