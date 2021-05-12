import React, {useMemo} from 'react'
import {ScopeContext} from './scopeContext'
import {PropSchema, ScopeContextValue, StoryProp, WorkshopScope, WorkshopStory} from './types'

export function ScopeProvider(_props: {
  children?: React.ReactNode
  props: StoryProp[]
  registerProp: (PropSchema: PropSchema) => void
  scope: WorkshopScope | null
  setPropValue: (PropName: string, value: any) => void
  story: WorkshopStory | null
  title: string
  unregisterProp: (PropName: string) => void
}) {
  const {children, props, registerProp, scope, setPropValue, story, title, unregisterProp} = _props

  const contextValue: ScopeContextValue = useMemo(
    () => ({scope, story, props, registerProp, setPropValue, title, unregisterProp}),
    [scope, story, props, registerProp, setPropValue, title, unregisterProp]
  )

  return <ScopeContext.Provider value={contextValue}>{children}</ScopeContext.Provider>
}
