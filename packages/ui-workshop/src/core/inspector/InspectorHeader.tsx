import {Card, Layer, Tab, TabList} from '@sanity/ui'
import {CSSProperties, memo, useCallback, useMemo} from 'react'
import styled from 'styled-components'

import {InspectorTab} from './types'

const MemoTab = memo(Tab)

const Root = styled(Card)`
  line-height: 0;

  @media screen and (max-width: ${({theme}) => theme.sanity.media[1] - 1}px) {
    text-align: center;
  }
`

export const InspectorHeader = memo(function InspectorHeader(props: {
  currentTabId: string | null
  onTabChange: (id: string) => void
  tabs: InspectorTab[]
}) {
  const {currentTabId, onTabChange, tabs} = props

  const layerStyle: CSSProperties = useMemo(() => ({flex: 'none', position: 'sticky', top: 0}), [])

  const children = useMemo(
    () =>
      tabs.map((tab) => (
        <InspectorTabView
          key={tab.id}
          onTabChange={onTabChange}
          selected={tab.id === currentTabId}
          tab={tab}
        />
      )),
    [currentTabId, onTabChange, tabs],
  )

  return (
    <Layer style={layerStyle}>
      <Root padding={2} shadow={1}>
        <TabList space={1}>{children}</TabList>
      </Root>
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
      fontSize={[2, 2, 1]}
      id={tab.id}
      label={tab.label}
      onClick={handleClick}
      selected={selected}
      tone={tab.tone}
    />
  )
}
