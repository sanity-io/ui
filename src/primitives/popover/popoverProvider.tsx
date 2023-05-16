import React, {useState, useCallback, useMemo} from 'react'
import {PopoverContext} from './popoverContext'

/**
 * @public
 */
export interface PopoverProviderProps {
  children?: React.ReactNode
}

/**
 * @public
 */
export const PopoverProvider = ({children}: PopoverProviderProps): React.ReactElement => {
  const [lastUpdateId, setUpdateId] = useState<string | null>(null)

  const forceUpdate = useCallback(() => {
    // Generate a new random ID
    const newId = Math.random().toString(36).substr(2, 9)
    setUpdateId(newId)
  }, [])

  const value = useMemo(
    () => ({version: 0.0, lastUpdateId, forceUpdate}),
    [lastUpdateId, forceUpdate]
  )

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
}
