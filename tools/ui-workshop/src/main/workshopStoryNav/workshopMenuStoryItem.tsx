import {SquareIcon} from '@sanity/icons'
import {Box, Flex, Text} from '@sanity/ui'
import React, {useCallback} from 'react'
import {TreeCard} from '../../components/treeCard'
import {WorkshopScope, WorkshopStory} from '../../types'
import {useWorkshop} from '../../useWorkshop'

export function WorkshopMenuStoryItem(props: {
  level: number
  scope: WorkshopScope
  story: WorkshopStory
}) {
  const {level, scope, story} = props
  const {scope: currentGroup, story: currentStory, pushLocation} = useWorkshop()

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()
      pushLocation({path: `/${scope.name}/${story.name}`})
    },
    [pushLocation, scope, story]
  )

  return (
    <TreeCard
      $level={level}
      aria-pressed={scope === currentGroup && story === currentStory}
      forwardedAs="a"
      data-as="button"
      href={`/${scope.name}/${story.name}`}
      onClick={handleStoryClick}
      key={story.name}
      padding={2}
      radius={2}
    >
      <Flex>
        <Box marginRight={2}>
          <Text size={1} style={{visibility: 'hidden'}}>
            <SquareIcon />
          </Text>
        </Box>
        <Text size={1}>{story.title}</Text>
      </Flex>
    </TreeCard>
  )
}
