import {AxeResults} from 'axe-core'
import React, {useMemo} from 'react'
import {ScopeContext} from './scopeContext'
import {PropSchema, ScopeContextValue, WorkshopScope, WorkshopStory} from './types'

export function ScopeProvider(_props: {
  axeResults: AxeResults | null
  children?: React.ReactNode
  registerProp: (PropSchema: PropSchema) => void
  schemas: PropSchema[]
  scope: WorkshopScope | null
  setPropValue: (PropName: string, value: any) => void
  story: WorkshopStory | null
  title: string
  unregisterProp: (PropName: string) => void
  value: any
}): React.ReactElement {
  const {
    axeResults,
    children,
    registerProp,
    schemas,
    scope,
    setPropValue,
    story,
    title,
    unregisterProp,
    value,
  } = _props

  const contextValue: ScopeContextValue = useMemo(
    () => ({
      axeResults,
      schemas,
      scope,
      story,
      registerProp,
      setPropValue,
      title,
      unregisterProp,
      value,
    }),
    [axeResults, schemas, scope, story, registerProp, setPropValue, title, unregisterProp, value]
  )

  return <ScopeContext.Provider value={contextValue}>{children}</ScopeContext.Provider>
}
