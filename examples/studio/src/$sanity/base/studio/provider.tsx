import {StudioContext} from './context'
import {PluginProvider} from './plugin'
import {StudioCommand} from './types'

export function StudioProvider({
  children,
  commands = [],
  dataset,
  plugins,
  projectId,
}: {
  children?: React.ReactNode
  commands?: StudioCommand[]
  dataset: string
  plugins: any[]
  projectId: string
}) {
  return (
    <StudioContext.Provider value={{commands, dataset, projectId}}>
      <PluginProvider plugins={plugins}>{children}</PluginProvider>
    </StudioContext.Provider>
  )
}
