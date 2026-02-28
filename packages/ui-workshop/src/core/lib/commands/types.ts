export type CommandId = string

export type Unregister = () => void
export type Unsubscribe = () => void

export type KeyToken = 'mod' | 'ctrl' | 'meta' | 'shift' | 'alt' | string

export type RunContext = {
  event?: KeyboardEvent
  source?: 'keyboard' | 'palette' | 'api'
}

export type CommandRunner = (id: CommandId, ctx: RunContext) => void

export type CommandBindingBase = {
  id: CommandId
  preventDefault?: boolean
  stopPropagation?: boolean
  allowInEditableTarget?: boolean
  allowRepeat?: boolean
  debugName?: string
}

export type ChordBinding = CommandBindingBase & {
  type: 'chord'
  keys: KeyToken[]
  handler: (ctx: RunContext) => void
}

export type SequenceBinding = CommandBindingBase & {
  type: 'sequence'
  keys: string[]
  timeoutMs?: number
  handler: (ctx: RunContext) => void
}

export type CommandBinding = ChordBinding | SequenceBinding

export type ActiveBinding = {
  id: CommandId
  type: 'chord' | 'sequence'
  keys: string[]
  display: string
  displayKeys: string[]
  layer: string
  priority: number
}

export type Candidate = {
  binding: SequenceBinding
  layerName: string
  priority: number
}

export type SequenceState =
  | {kind: 'idle'}
  | {
      kind: 'active'
      buffer: string[]
      deadline: number
      candidates: Candidate[]
    }

export type SequenceAction =
  | {type: 'sequence/reset'}
  | {type: 'sequence/key'; key: string; now: number; candidates: Candidate[]}

export type Commands = {
  // Registration
  registerGlobal(bindings: CommandBinding[]): Unregister
  setModeLayer(name: string, bindings: CommandBinding[]): Unregister
  pushModal(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): Unregister
  registerLayer(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): Unregister

  // Registry controls
  clearLayer(name: string): void
  setLayerEnabled(name: string, enabled: boolean): void
  setEnabled(enabled: boolean): void

  // Execution
  run(id: CommandId, ctx?: RunContext): void

  // Observation (for Command Palette)
  getActiveBindings(): ActiveBinding[]
  subscribe(listener: (active: ActiveBinding[]) => void): Unsubscribe

  // Additional targets
  addTarget(target: Window | Document): Unregister

  // Lifecycle
  unsubscribe(): void
}

export type CreateCommandsOptions = {
  target?: Window | Document
  sequenceTimeoutMs?: number
  blockOnEditableTarget?: boolean
  includeGlobalDuringExclusiveModal?: boolean
  /** Override platform detection for testing. 'mac' uses Meta/Cmd, 'other' uses Control. */
  platform?: 'mac' | 'other'
}
