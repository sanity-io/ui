import {Card} from '@sanity/ui'
import React from 'react'

export function PaneItem(props: {
  active?: boolean
  children?: React.ReactNode
  onClick: () => void
  selected: boolean
}) {
  const {active, children, onClick, selected} = props

  return (
    <div aria-selected={active && selected}>
      <Card as="button" onClick={onClick} padding={2} radius={2} selected={selected} tone="inherit">
        {children}
      </Card>
    </div>
  )
}
