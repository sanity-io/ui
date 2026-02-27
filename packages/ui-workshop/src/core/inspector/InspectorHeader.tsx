import {Card, Layer, Tab, TabList} from '@sanity/ui'
import {memo, useCallback} from 'react'

import {inspectorHeader, inspectorHeaderCard} from './InspectorHeader.css'
import type {InspectorTab} from './types'

export const InspectorHeader = memo(function InspectorHeader(props: {
  currentTabId: string | null
  onTabChange: (id: string) => void
  tabs: InspectorTab[]
}) {
  const {currentTabId, onTabChange, tabs} = props

  return (
    <Layer className={inspectorHeader}>
      <Card className={inspectorHeaderCard} padding={2} shadow={1}>
        <TabList gap={1}>
          {tabs.map((tab) => (
            <InspectorTabView
              key={tab.id}
              selected={tab.id === currentTabId}
              tab={tab}
              onTabChange={onTabChange}
            />
          ))}
        </TabList>
      </Card>
    </Layer>
  )
})

function InspectorTabView(props: {
  onTabChange: (id: string) => void
  selected: boolean
  tab: InspectorTab
}) {
  const {onTabChange, selected, tab} = props

  const handleClick = useCallback(() => {
    onTabChange(tab.id)
  }, [onTabChange, tab])

  return (
    <Tab
      aria-controls={`${tab.id}-panel`}
      fontSize={[2, 2, 1]}
      id={tab.id}
      label={tab.label}
      selected={selected}
      tone={tab.tone}
      onClick={handleClick}
    />
  )
}
