import {ToggleArrowRightIcon} from '@sanity/icons'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {TreeCard} from '../../components/treeCard'
import {MenuScope} from './types'
import {WorkshopMenuStoryItem} from './workshopMenuStoryItem'

export function WorkshopMenuItem(props: {level: number; item: MenuScope}) {
  const {item, level} = props
  const {scope} = item
  const [expanded, setExpanded] = useState(false)
  const handleToggle = useCallback(() => setExpanded((v) => !v), [])

  return (
    <Box>
      <TreeCard $level={level} forwardedAs="button" onClick={handleToggle} padding={2} radius={2}>
        <Flex>
          <Box marginRight={1}>
            <Text size={1}>
              <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
            </Text>
          </Box>
          <Box flex={1}>
            <Text size={1} weight="semibold">
              {item.title}
            </Text>
          </Box>
          {!expanded && (
            <Text muted size={1}>
              {scope.stories.length}
            </Text>
          )}
        </Flex>
      </TreeCard>

      <Stack hidden={!expanded} marginTop={1} space={1}>
        {scope.stories.map((story, idx) => (
          <WorkshopMenuStoryItem key={idx} level={level + 1} scope={scope} story={story} />
        ))}
      </Stack>
    </Box>
  )
}
