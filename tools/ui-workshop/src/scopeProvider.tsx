import React, {useMemo} from 'react'
import {ScopeContext} from './scopeContext'
import {KnobSchema, ScopeContextValue, StoryKnob, WorkshopScope, WorkshopStory} from './types'

export function ScopeProvider(props: {
  children?: React.ReactNode
  knobs: StoryKnob[]
  registerKnob: (knobSchema: KnobSchema) => void
  scope: WorkshopScope | null
  setKnobValue: (knobName: string, value: any) => void
  story: WorkshopStory | null
  title: string
  unregisterKnob: (knobName: string) => void
}) {
  const {children, knobs, registerKnob, scope, setKnobValue, story, title, unregisterKnob} = props

  const contextValue: ScopeContextValue = useMemo(
    () => ({scope, story, knobs, registerKnob, setKnobValue, title, unregisterKnob}),
    [scope, story, knobs, registerKnob, setKnobValue, title, unregisterKnob]
  )

  return <ScopeContext.Provider value={contextValue}>{children}</ScopeContext.Provider>
}
