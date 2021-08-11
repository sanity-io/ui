import {Card, Layer, Tab, TabList, TabPanel} from '@sanity/ui'
import {AxeResults} from 'axe-core'
import React, {useState} from 'react'
import {features} from '../../features'
import {Prop} from '../../props'
import {useScope} from '../../useScope'
import {InspectAxeResults} from './inspectAxeResults'

export function WorkshopStoryInspector(props: {axeResults: AxeResults | null}): React.ReactElement {
  const {axeResults} = props
  const scope = useScope()
  const [tab, setTab] = useState<'props' | 'axe-results'>('props')

  const hasA11yViolations = (axeResults?.violations?.length || 0) > 0

  return (
    <Card borderLeft flex={1} overflow="auto" style={{minWidth: 180, maxWidth: 300}}>
      <Layer style={{position: 'sticky', top: 0}}>
        <Card paddingX={3} paddingY={2} shadow={1}>
          <TabList space={1}>
            <Tab
              aria-controls="props-panel"
              fontSize={1}
              id="props-tab"
              label="Props"
              onClick={() => setTab('props')}
              selected={tab === 'props'}
            />
            {features.axe && (
              <Tab
                aria-controls="axe-results-panel"
                fontSize={1}
                id="axe-results-tab"
                label={(<>Accessibility ({axeResults?.violations.length || 0})</>) as any}
                onClick={() => setTab('axe-results')}
                selected={tab === 'axe-results'}
                tone={hasA11yViolations ? 'critical' : undefined}
              />
            )}
          </TabList>
        </Card>
      </Layer>

      <TabPanel aria-labelledby="props-tab" hidden={tab !== 'props'} id="props-panel" padding={2}>
        {scope.props.map((prop, propIndex) => (
          <Prop key={propIndex} schema={prop.schema} value={prop.value} />
        ))}
      </TabPanel>

      {features.axe && (
        <TabPanel
          aria-labelledby="axe-results-tab"
          hidden={tab !== 'axe-results'}
          id="axe-results-panel"
        >
          {axeResults && <InspectAxeResults axeResults={axeResults} />}
        </TabPanel>
      )}
    </Card>
  )
}
