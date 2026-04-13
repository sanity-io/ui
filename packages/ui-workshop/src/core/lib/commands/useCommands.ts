import {useEffect} from 'react'

import type {CommandBinding} from './types'
import {useCommandController} from './useCommandController'
import {useUnique} from './useUnique'

/**
 * Hook to register keyboard commands with handlers
 *
 * Commands are automatically registered when the component mounts and
 * unregistered when it unmounts. If the bindings array changes, commands
 * are re-registered.
 *
 * @public
 * @param bindings - Array of command bindings with inline handlers
 * @example
 * ```tsx
 * function Editor() {
 *   const save = useCallback(() => {
 *     // save logic
 *   }, [])
 *
 *   useCommands([
 *     { type: 'chord', id: 'editor.save', keys: ['mod', 's'], handler: save },
 *     { type: 'chord', id: 'editor.undo', keys: ['mod', 'z'], handler: undo },
 *   ])
 *
 *   return <textarea />
 * }
 * ```
 */
export function useCommands(bindings: CommandBinding[]): void {
  const commands = useCommandController()
  const stableBindings = useUnique(bindings)

  useEffect(() => {
    return commands.registerGlobal(stableBindings)
  }, [commands, stableBindings])
}
