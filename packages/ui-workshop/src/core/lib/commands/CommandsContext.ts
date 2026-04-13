import {createContext} from 'react'

import type {Commands} from './types'

/**
 * Context value for Commands system
 * @internal
 */
export interface CommandsContextValue {
  commands: Commands
}

/**
 * React Context for Commands instance
 * @internal
 */
export const CommandsContext = createContext<CommandsContextValue | null>(null)
