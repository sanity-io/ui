import type {ResponsiveProp} from '@sanity/ui/css'
import {type ReactElement, type ReactNode, useMemo} from 'react'

import {DialogContext, type DialogContextValue} from './dialogContext'
import type {DialogPosition} from './types'

/**
 * This API might change. DO NOT USE IN PRODUCTION.
 * @beta
 */
export interface DialogProviderProps {
  children?: ReactNode
  position?: ResponsiveProp<DialogPosition>
  zOffset?: ResponsiveProp<number>
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
