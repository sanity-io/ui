import {createContext, useContext} from 'react'

const PluginContext = createContext<any>(null)

export function useStudioPlugins() {
  return useContext(PluginContext).plugins
}

export function useStudioToolPlugins() {
  return useContext(PluginContext).plugins.filter((p: any) => p.type === 'tool')
}

export function PluginProvider({children, plugins}: {children?: React.ReactNode; plugins: any[]}) {
  return <PluginContext.Provider value={{plugins}}>{children}</PluginContext.Provider>
}
