import {Box, Card} from '@sanity/ui'
import React, {useMemo} from 'react'
import {useWorkshop} from '../../useWorkshop'
import {buildMenu} from './helpers'
import {MenuCollection} from './types'
import {WorkshopMenuList} from './workshopMenuList'

export function WorkshopStoryNav(props: {collections?: MenuCollection[]}) {
  const {collections = []} = props
  const {scopes} = useWorkshop()
  const menu = useMemo(() => buildMenu(collections, scopes), [collections, scopes])

  return (
    <Card borderRight flex={1} overflow="auto" style={{minWidth: 180, maxWidth: 300}}>
      {menu.type === 'list' && (
        <Box padding={3}>
          <WorkshopMenuList level={0} list={menu} />
        </Box>
      )}
    </Card>
  )
}
