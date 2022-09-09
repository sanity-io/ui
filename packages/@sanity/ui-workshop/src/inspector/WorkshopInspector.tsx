import {Box, ButtonTone, Card, Flex, Layer, Tab, TabList, TabPanel} from '@sanity/ui'
import {createElement, memo, useCallback, useMemo, useState} from 'react'
import {useWorkshop} from '../useWorkshop'

const MemoTab = memo(Tab)

interface InspectorTab {
  id: string
  label: React.ReactNode
  panel?: React.ElementType
  tone?: ButtonTone
}

/** @internal */
export const WorkshopInspector = memo(function WorkshopInspector(): React.ReactElement {
  const {plugins} = useWorkshop()

  const tabs: InspectorTab[] = useMemo(() => {
    return plugins
      .filter((plugin) => plugin.inspector)
      .map((plugin) => {
        return {
          id: plugin.name,
          label: plugin.title,
          tone: undefined,
          panel: plugin.inspector,
        }
      })
  }, [plugins])

  const [tabId, setTabId] = useState<string | null>(tabs.length > 0 ? tabs[0].id : null)
  const currentTab = tabs.find((tab) => tab.id === tabId)
  const showTabs = tabs.length > 1

  return (
    <Card
      borderLeft
      display={['none', 'none', 'block']}
      flex={1}
      overflow="auto"
      style={{minWidth: 180, maxWidth: 300}}
    >
      <Flex direction="column" height="fill">
        {showTabs && (
          <InspectorHeaderWithTabs currentTabId={tabId} onTabChange={setTabId} tabs={tabs} />
        )}

        {showTabs &&
          tabs.map((tab) => (
            <TabPanel
              aria-labelledby={`${tab.id}-tab`}
              flex={1}
              hidden={tab.id !== tabId}
              id={`${tab.id}-panel`}
              key={tab.id}
              overflow="auto"
            >
              {tab.panel && createElement(tab.panel)}
            </TabPanel>
          ))}

        {!showTabs && currentTab?.panel && (
          <Box flex={1} overflow="auto">
            <MemoRender component={currentTab.panel} />
          </Box>
        )}
      </Flex>
    </Card>
  )
})

const InspectorHeaderWithTabs = memo(function InspectorHeaderWithTabs(props: {
  currentTabId: string | null
  onTabChange: (id: string) => void
  tabs: InspectorTab[]
}) {
  const {currentTabId, onTabChange, tabs} = props

  return (
    <Layer style={{flex: 'none', position: 'sticky', top: 0}}>
      <Card padding={2} shadow={1} style={{lineHeight: 0}}>
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
    <MemoTab
      aria-controls={`${tab.id}-panel`}
      fontSize={1}
      id={tab.id}
      label={tab.label}
      onClick={handleClick}
      selected={selected}
      tone={tab.tone}
    />
  )
}

const MemoRender = memo(function MemoRender(props: {component: React.ElementType}) {
  return createElement(props.component)
})
