import {Box, Flex, Layer, TabPanel} from '@sanity/ui'
import {useState} from 'react'

import {EMPTY_RECORD} from '../constants'
import {useWorkshop} from '../useWorkshop'
import {InspectorHeader} from './InspectorHeader'
import type {InspectorTab} from './types'
import {root} from './WorkshopInspector.css'

/** @internal */
export function WorkshopInspector(props: {expanded: boolean}) {
  const {expanded} = props
  const {plugins} = useWorkshop()

  const tabs: InspectorTab[] = plugins
    .filter((plugin) => plugin.inspector)
    .map((plugin) => {
      return {
        id: plugin.name,
        label: plugin.title,
        tone: 'default',
        plugin,
      }
    })

  const [tabId, setTabId] = useState<string | null>(tabs.length > 0 ? tabs[0]!.id : null)
  const currentTab = tabs.find((tab) => tab.id === tabId)
  const showTabs = tabs.length > 1

  return (
    <Layer
      className={root}
      display={expanded ? ['block'] : ['none', 'none', 'block']}
      flex={1}
      overflow={['hidden', 'hidden', 'auto']}
      shadow={1}
    >
      <Flex direction="column" height="fill">
        {showTabs && <InspectorHeader currentTabId={tabId} tabs={tabs} onTabActivate={setTabId} />}

        {showTabs &&
          tabs.map((tab) => (
            <TabPanel
              key={tab.id}
              aria-labelledby={`${tab.id}-tab`}
              flex={1}
              hidden={tab.id !== tabId}
              id={`${tab.id}-panel`}
              overflow="auto"
            >
              {tab.plugin.inspector && (
                <RenderInspector
                  component={tab.plugin.inspector}
                  options={tab.plugin.options ?? EMPTY_RECORD}
                />
              )}
            </TabPanel>
          ))}

        {!showTabs && currentTab?.plugin.inspector && (
          <Box flex={1} overflow="auto">
            <RenderInspector
              component={currentTab.plugin.inspector}
              options={currentTab.plugin.options ?? EMPTY_RECORD}
            />
          </Box>
        )}
      </Flex>
    </Layer>
  )
}

function RenderInspector(props: {component: React.ElementType; options: Record<string, never>}) {
  const {component: Component, options} = props

  return <Component options={options} />
}
