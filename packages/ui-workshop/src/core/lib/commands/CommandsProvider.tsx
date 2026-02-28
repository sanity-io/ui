import {type ReactNode, useEffect, useMemo, useState} from 'react'

import {CommandsContext} from './CommandsContext'
import {createCommands} from './createCommands'
import type {CreateCommandsOptions} from './types'

/**
 * Props for CommandsProvider
 * @public
 */
export interface CommandsProviderProps extends CreateCommandsOptions {
  children: ReactNode
}

/**
 * Provider component that creates and manages a Commands instance
 * @public
 */
export function CommandsProvider(props: CommandsProviderProps) {
  const {children, ...options} = props

  // Create Commands instance in useEffect to ensure proper cleanup in StrictMode
  const [commands, setCommands] = useState<ReturnType<typeof createCommands> | null>(null)

  useEffect(() => {
    const instance = createCommands(options)
    setCommands(instance)

    return () => {
      instance.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => (commands ? {commands} : null), [commands])

  if (!value) return null

  return <CommandsContext.Provider value={value}>{children}</CommandsContext.Provider>
}
