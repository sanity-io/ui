import {formatKey, formatKeys} from './formatKeys'
import {createLayerManager} from './layerManager'
import {
  hasModifiersHeld,
  matchesChord,
  normalizeKey,
  shouldIgnoreComposition,
  shouldIgnoreRepeat,
  shouldIgnoreTarget,
} from './matcher'
import {findBestCandidate, sequenceReducer} from './sequenceReducer'
import type {
  ActiveBinding,
  Candidate,
  ChordBinding,
  CommandBinding,
  CommandId,
  Commands,
  CreateCommandsOptions,
  RunContext,
  SequenceState,
  Unregister,
  Unsubscribe,
} from './types'

// const DEFAULT_SEQUENCE_TIMEOUT_MS = 800
const DEFAULT_ALLOW_REPEAT = false
const DEFAULT_BLOCK_ON_EDITABLE_TARGET = true
const DEFAULT_INCLUDE_GLOBAL_DURING_EXCLUSIVE_MODAL = true
const DEFAULT_PREVENT_DEFAULT = true

export function createCommands(options?: CreateCommandsOptions): Commands {
  const target = options?.target ?? window
  const blockOnEditableTarget = options?.blockOnEditableTarget ?? DEFAULT_BLOCK_ON_EDITABLE_TARGET
  const includeGlobalDuringExclusiveModal =
    options?.includeGlobalDuringExclusiveModal ?? DEFAULT_INCLUDE_GLOBAL_DURING_EXCLUSIVE_MODAL
  const platformOverride = options?.platform

  const layerManager = createLayerManager()
  const handlers = new Map<CommandId, (ctx: RunContext) => void>()
  let enabled = true
  let sequenceState: SequenceState = {kind: 'idle'}
  const subscribers = new Set<(active: ActiveBinding[]) => void>()
  const additionalTargets = new Set<Window | Document>()

  // Notify all subscribers
  function notifySubscribers() {
    const active = getActiveBindings()
    for (const listener of subscribers) {
      listener(active)
    }
  }

  // Reset sequence state
  function resetSequence() {
    sequenceState = sequenceReducer(sequenceState, {type: 'sequence/reset'})
  }

  // Compute active bindings for command palette
  function getActiveBindings(): ActiveBinding[] {
    const activeLayers = layerManager.getActiveLayers(includeGlobalDuringExclusiveModal)
    const bindings: ActiveBinding[] = []

    // Priority is based on layer order (topmost = highest priority)
    for (let i = 0; i < activeLayers.length; i++) {
      const layer = activeLayers[i]
      const priority = activeLayers.length - i

      for (const binding of layer.bindings) {
        bindings.push({
          id: binding.id,
          type: binding.type,
          keys: [...binding.keys],
          display: formatKeys(binding.keys, binding.type),
          displayKeys: binding.keys.map((k) => formatKey(k, platformOverride)),
          layer: layer.name,
          priority,
        })
      }
    }

    return bindings
  }

  // Get all sequence candidates from active layers
  function getSequenceCandidates(): Candidate[] {
    const activeLayers = layerManager.getActiveLayers(includeGlobalDuringExclusiveModal)
    const candidates: Candidate[] = []

    for (let i = 0; i < activeLayers.length; i++) {
      const layer = activeLayers[i]
      const priority = activeLayers.length - i

      for (const binding of layer.bindings) {
        if (binding.type === 'sequence') {
          candidates.push({
            binding,
            layerName: layer.name,
            priority,
          })
        }
      }
    }

    return candidates
  }

  // Try to match chords in active layers
  function tryMatchChord(event: KeyboardEvent): ChordBinding | null {
    const activeLayers = layerManager.getActiveLayers(includeGlobalDuringExclusiveModal)

    for (const layer of activeLayers) {
      for (const binding of layer.bindings) {
        if (binding.type === 'chord') {
          const matches = matchesChord(event, binding, platformOverride)
          if (matches) {
            return binding
          }
        }
      }
    }

    return null
  }

  // Execute a command
  function run(id: CommandId, ctx?: RunContext): void {
    const handler = handlers.get(id)
    if (!handler) {
      if (process.env['NODE_ENV'] !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`No handler registered for command "${id}"`)
      }
      return
    }
    handler(ctx ?? {source: 'api'})
  }

  // Handle keydown events
  function handleKeyDown(event: KeyboardEvent) {
    if (!enabled) return

    // Filter events
    if (shouldIgnoreComposition(event)) {
      return
    }

    const now = Date.now()

    // Try to match chords first (chords take precedence)
    const chordBinding = tryMatchChord(event)

    if (chordBinding) {
      // Check editable target
      const shouldIgnore = shouldIgnoreTarget(
        event,
        blockOnEditableTarget,
        chordBinding.allowInEditableTarget ?? false,
      )
      if (shouldIgnore) {
        return
      }

      // Check if repeat should be ignored for this binding
      const isRepeat = shouldIgnoreRepeat(event, chordBinding.allowRepeat ?? DEFAULT_ALLOW_REPEAT)

      // Cancel any active sequence
      resetSequence()

      // Always prevent default for matching chords (even on repeat)
      if (chordBinding.preventDefault ?? DEFAULT_PREVENT_DEFAULT) {
        event.preventDefault()
      }
      if (chordBinding.stopPropagation) {
        event.stopPropagation()
      }

      // Only execute command if not a repeat
      if (!isRepeat) {
        run(chordBinding.id, {event, source: 'keyboard'})
      }
      return
    }

    // For non-chord events (sequences), ignore repeats entirely
    if (event.repeat) return

    // Don't process sequences if modifiers are held
    if (hasModifiersHeld(event)) {
      resetSequence()
      return
    }

    // Try to match sequences
    const key = normalizeKey(event.key)
    const candidates = getSequenceCandidates()

    sequenceState = sequenceReducer(sequenceState, {
      type: 'sequence/key',
      key,
      now,
      candidates,
    })

    if (sequenceState.kind === 'active') {
      // Find best complete candidate
      const best = findBestCandidate(sequenceState.buffer, sequenceState.candidates)

      if (best) {
        // Check editable target
        if (
          shouldIgnoreTarget(
            event,
            blockOnEditableTarget,
            best.binding.allowInEditableTarget ?? false,
          )
        ) {
          resetSequence()
          return
        }

        // Sequence complete!
        if (best.binding.preventDefault ?? DEFAULT_PREVENT_DEFAULT) {
          event.preventDefault()
        }
        if (best.binding.stopPropagation) {
          event.stopPropagation()
        }

        run(best.binding.id, {event, source: 'keyboard'})
        resetSequence()
      } else {
        // Partial match - preventDefault if requested
        const hasPrefix = sequenceState.candidates.length > 0
        if (
          hasPrefix &&
          (sequenceState.candidates[0].binding.preventDefault ?? DEFAULT_PREVENT_DEFAULT)
        ) {
          event.preventDefault()
        }
      }
    }
  }

  // Mount listener
  target.addEventListener('keydown', handleKeyDown as EventListener)

  // Registration functions
  function registerGlobal(bindings: CommandBinding[]): Unregister {
    // Check for duplicate IDs and register handlers
    for (const binding of bindings) {
      if (handlers.has(binding.id)) {
        if (process.env['NODE_ENV'] !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`Command ID "${binding.id}" is already registered. Replacing handler.`)
        }
      }
      handlers.set(binding.id, binding.handler)
    }

    const unregister = layerManager.registerGlobal(bindings)
    resetSequence()
    notifySubscribers()

    return () => {
      // Remove handlers
      for (const binding of bindings) {
        handlers.delete(binding.id)
      }
      unregister()
      resetSequence()
      notifySubscribers()
    }
  }

  function setModeLayer(name: string, bindings: CommandBinding[]): Unregister {
    // Register handlers
    for (const binding of bindings) {
      if (handlers.has(binding.id)) {
        if (process.env['NODE_ENV'] !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`Command ID "${binding.id}" is already registered. Replacing handler.`)
        }
      }
      handlers.set(binding.id, binding.handler)
    }

    const unregister = layerManager.setModeLayer(name, bindings)
    resetSequence()
    notifySubscribers()
    return () => {
      for (const binding of bindings) {
        handlers.delete(binding.id)
      }
      unregister()
      resetSequence()
      notifySubscribers()
    }
  }

  function pushModal(
    name: string,
    bindings: CommandBinding[],
    opts?: {exclusive?: boolean},
  ): Unregister {
    // Register handlers
    for (const binding of bindings) {
      if (handlers.has(binding.id)) {
        if (process.env['NODE_ENV'] !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`Command ID "${binding.id}" is already registered. Replacing handler.`)
        }
      }
      handlers.set(binding.id, binding.handler)
    }

    const unregister = layerManager.pushModal(name, bindings, opts)
    resetSequence()
    notifySubscribers()
    return () => {
      for (const binding of bindings) {
        handlers.delete(binding.id)
      }
      unregister()
      resetSequence()
      notifySubscribers()
    }
  }

  function registerLayer(
    name: string,
    bindings: CommandBinding[],
    opts?: {exclusive?: boolean},
  ): Unregister {
    // Register handlers
    for (const binding of bindings) {
      if (handlers.has(binding.id)) {
        if (process.env['NODE_ENV'] !== 'production') {
          // eslint-disable-next-line no-console
          console.warn(`Command ID "${binding.id}" is already registered. Replacing handler.`)
        }
      }
      handlers.set(binding.id, binding.handler)
    }

    const unregister = layerManager.registerLayer(name, bindings, opts)
    resetSequence()
    notifySubscribers()
    return () => {
      for (const binding of bindings) {
        handlers.delete(binding.id)
      }
      unregister()
      resetSequence()
      notifySubscribers()
    }
  }

  function clearLayer(name: string): void {
    layerManager.clearLayer(name)
    resetSequence()
    notifySubscribers()
  }

  function setLayerEnabled(name: string, enabledFlag: boolean): void {
    layerManager.setLayerEnabled(name, enabledFlag)
    resetSequence()
    notifySubscribers()
  }

  function setEnabled(enabledFlag: boolean): void {
    enabled = enabledFlag
    if (!enabled) {
      resetSequence()
    }
  }

  function subscribe(listener: (active: ActiveBinding[]) => void): Unsubscribe {
    subscribers.add(listener)
    listener(getActiveBindings())
    return () => {
      subscribers.delete(listener)
    }
  }

  function addTarget(newTarget: Window | Document): Unregister {
    additionalTargets.add(newTarget)
    newTarget.addEventListener('keydown', handleKeyDown as EventListener)
    return () => {
      additionalTargets.delete(newTarget)
      newTarget.removeEventListener('keydown', handleKeyDown as EventListener)
    }
  }

  function unsubscribe(): void {
    target.removeEventListener('keydown', handleKeyDown as EventListener)
    for (const additionalTarget of additionalTargets) {
      additionalTarget.removeEventListener('keydown', handleKeyDown as EventListener)
    }
    additionalTargets.clear()
    resetSequence()
    subscribers.clear()
  }

  return {
    registerGlobal,
    setModeLayer,
    pushModal,
    registerLayer,
    clearLayer,
    setLayerEnabled,
    setEnabled,
    run,
    getActiveBindings,
    subscribe,
    addTarget,
    unsubscribe,
  }
}
