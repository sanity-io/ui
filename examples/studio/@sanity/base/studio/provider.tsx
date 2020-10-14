import React, {createContext} from 'react'
import {PluginProvider} from './plugin'

const StudioContext = createContext<any>(null)

export function StudioProvider({
  children,
  dataset,
  plugins,
  projectId,
}: {
  children?: React.ReactNode
  dataset: string
  plugins: any[]
  projectId: string
}) {
  return (
    <StudioContext.Provider value={{dataset, projectId}}>
      <PluginProvider plugins={plugins}>{children}</PluginProvider>
    </StudioContext.Provider>
  )
}
