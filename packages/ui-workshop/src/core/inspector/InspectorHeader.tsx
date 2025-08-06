import {Card, Layer, Tab, TabList} from '@sanity/ui'
import {memo, useCallback} from 'react'

import {inspectorHeader, inspectorHeaderCard} from '#styles'

import {InspectorTab} from './types'

export const InspectorHeader = memo(function InspectorHeader(props: {
  currentTabId: string | null
  onTabChange: (id: string) => void
  tabs: InspectorTab[]
}) {
  const {currentTabId, onTabChange, tabs} = props

  return (
    <Layer className={inspectorHeader}>
      <Card className={inspectorHeaderCard} padding={2} shadow={1}>
        <TabList space={1}>
          {tabs.map((tab) => (
            <InspectorTabView
              key={tab.id}
              onTabChange={onTabChange}
              selected={tab.id === currentTabId}
              tab={tab}
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
      onClick={handleClick}
      selected={selected}
      tone={tab.tone}
    />
  )
}
