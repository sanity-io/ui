import React, {useMemo} from 'react'
import {DialogContext, DialogContextValue} from './dialogContext'
import {DialogPosition} from './types'

interface DialogProviderProps {
  children?: React.ReactNode
  position?: DialogPosition | DialogPosition[]
  zOffset?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function DialogProvider(props: DialogProviderProps) {
  const {children, position, zOffset} = props

  const contextValue: DialogContextValue = useMemo(
    () => ({
      version: 0.0,
      position,
      zOffset,
    }),
    [position, zOffset]
  )

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>
}
