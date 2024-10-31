import {type ReactElement, type ReactNode, useMemo} from 'react'

import type {DialogPosition} from '../../types'
import {DialogContext, type DialogContextValue} from './dialogContext'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface DialogProviderProps {
  children?: ReactNode
  position?: DialogPosition | DialogPosition[]
  zOffset?: number | number[]
}

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export function DialogProvider(props: DialogProviderProps): ReactElement {
  const {children, position, zOffset} = props

  const contextValue: DialogContextValue = useMemo(
    () => ({
      version: 0.0,
      position,
      zOffset,
    }),
    [position, zOffset],
  )

  return <DialogContext.Provider value={contextValue}>{children}</DialogContext.Provider>
}

DialogProvider.displayName = 'DialogProvider'
