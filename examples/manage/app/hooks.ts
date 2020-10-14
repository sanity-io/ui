import {useContext} from 'react'
import {AppContext} from './context'

export function useApp() {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('App: missing context value')
  }

  return app
}
