import {ToggleArrowRightIcon} from '@sanity/icons'
import {Box, Flex, Stack, Text} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import {TreeCard} from '../../components/treeCard'
import {MenuList} from './types'
import {WorkshopMenuItem} from './workshopMenuItem'

export function WorkshopMenuList(props: {level: number; list: MenuList}) {
  const {level, list} = props
  const [expanded, setExpanded] = useState(false)
  const isRoot = !list.name
  const handleToggle = useCallback(() => setExpanded((v) => !v), [])

  return (
    <Box>
      {list.name && (
        <TreeCard
          $level={level}
          forwardedAs="button"
          marginBottom={1}
          onClick={handleToggle}
          padding={2}
          radius={2}
        >
          <Flex>
            <Box marginRight={1}>
              <Text size={1}>
                <ToggleArrowRightIcon style={{transform: expanded ? 'rotate(90deg)' : undefined}} />
              </Text>
            </Box>
            <Box flex={1}>
              {list.title && (
                <Text size={1} weight="semibold">
                  {list.title}
                </Text>
              )}
            </Box>
            {!expanded && (
              <Text muted size={1}>
                {list.items.length}
              </Text>
            )}
          </Flex>
        </TreeCard>
      )}

      <Stack hidden={!isRoot && !expanded} space={1}>
        {list.items.map((item, idx) => {
          if (item.type === 'scope') {
            return <WorkshopMenuItem item={item} level={level + 1} key={idx} />
          }

          return <WorkshopMenuList key={idx} level={level + 1} list={item} />
        })}
      </Stack>
    </Box>
  )
}
