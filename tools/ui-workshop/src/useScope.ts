import {useContext} from 'react'
import {ScopeContext} from './scopeContext'
import {ScopeContextValue} from './types'

export function useScope(): ScopeContextValue {
  const app = useContext(ScopeContext)

  if (!app) {
    throw new Error('Scope: missing context value')
  }

  return app
}
