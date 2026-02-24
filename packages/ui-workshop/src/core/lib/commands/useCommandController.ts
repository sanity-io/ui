import {useContext} from 'react'

import {CommandsContext} from './CommandsContext'
import type {Commands} from './types'

/**
 * Hook to access the Commands controller instance
 * Use this for advanced use cases. For registering commands, use `useCommands` instead.
 *
 * @public
 * @example
 * ```tsx
 * const commands = useCommandController()
 * commands.run('save', { source: 'api' })
 * ```
 */
export function useCommandController(): Commands {
  const context = useContext(CommandsContext)

  if (!context) {
    throw new Error('useCommandController must be used within a CommandsProvider')
  }

  return context.commands
}
