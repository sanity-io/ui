import {useContext} from 'react'

import {AppContext, AppContextValue} from './AppContext'

export function useApp(): AppContextValue {
  const app = useContext(AppContext)

  if (!app) {
    throw new Error('useApp must be used within a AppContext.Provider')
  }

  return app
}
