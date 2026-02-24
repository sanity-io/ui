import type {CommandBinding} from './types'

export type LayerKind = 'global' | 'mode' | 'modal'

export type Layer = {
  name: string
  kind: LayerKind
  bindings: CommandBinding[]
  enabled: boolean
  exclusive?: boolean
  order: number // Registration order for stable sorting
}

export type LayerManagerState = {
  global: Layer | null
  mode: Layer | null
  modals: Layer[]
  nextOrder: number
}

export function createLayerManager(): {
  getState(): LayerManagerState
  registerGlobal(bindings: CommandBinding[]): () => void
  setModeLayer(name: string, bindings: CommandBinding[]): () => void
  pushModal(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): () => void
  registerLayer(name: string, bindings: CommandBinding[], opts?: {exclusive?: boolean}): () => void
  clearLayer(name: string): void
  setLayerEnabled(name: string, enabled: boolean): void
  getActiveLayers(includeGlobalDuringExclusiveModal: boolean): Layer[]
} {
  const state: LayerManagerState = {
    global: null,
    mode: null,
    modals: [],
    nextOrder: 0,
  }

  function getState(): LayerManagerState {
    return state
  }

  function registerGlobal(bindings: CommandBinding[]): () => void {
    const layer: Layer = {
      name: 'global',
      kind: 'global',
      bindings,
      enabled: true,
      order: state.nextOrder++,
    }
    state.global = layer

    return () => {
      if (state.global === layer) {
        state.global = null
      }
    }
  }

  function setModeLayer(name: string, bindings: CommandBinding[]): () => void {
    const layer: Layer = {
      name,
      kind: 'mode',
      bindings,
      enabled: true,
      order: state.nextOrder++,
    }
    state.mode = layer

    return () => {
      if (state.mode === layer) {
        state.mode = null
      }
    }
  }

  function pushModal(
    name: string,
    bindings: CommandBinding[],
    opts?: {exclusive?: boolean},
  ): () => void {
    const layer: Layer = {
      name,
      kind: 'modal',
      bindings,
      enabled: true,
      exclusive: opts?.exclusive,
      order: state.nextOrder++,
    }
    state.modals.push(layer)

    return () => {
      const index = state.modals.indexOf(layer)
      if (index !== -1) {
        state.modals.splice(index, 1)
      }
    }
  }

  function registerLayer(
    name: string,
    bindings: CommandBinding[],
    opts?: {exclusive?: boolean},
  ): () => void {
    // Generic layer registration - treats it as a modal
    return pushModal(name, bindings, opts)
  }

  function clearLayer(name: string): void {
    if (state.global?.name === name) {
      state.global = null
    } else if (state.mode?.name === name) {
      state.mode = null
    } else {
      state.modals = state.modals.filter((m) => m.name !== name)
    }
  }

  function setLayerEnabled(name: string, enabled: boolean): void {
    if (state.global?.name === name) {
      state.global.enabled = enabled
    } else if (state.mode?.name === name) {
      state.mode.enabled = enabled
    } else {
      const modal = state.modals.find((m) => m.name === name)
      if (modal) {
        modal.enabled = enabled
      }
    }
  }

  function getActiveLayers(includeGlobalDuringExclusiveModal: boolean): Layer[] {
    const hasExclusiveModal = state.modals.some((m) => m.enabled && m.exclusive)

    const layers: Layer[] = []

    // Add modals (topmost first)
    for (let i = state.modals.length - 1; i >= 0; i--) {
      if (state.modals[i].enabled) {
        layers.push(state.modals[i])
      }
    }

    // Add mode layer (unless blocked by exclusive modal)
    if (!hasExclusiveModal && state.mode?.enabled) {
      layers.push(state.mode)
    }

    // Add global layer (always, or based on config during exclusive modal)
    if (state.global?.enabled) {
      if (!hasExclusiveModal || includeGlobalDuringExclusiveModal) {
        layers.push(state.global)
      }
    }

    return layers
  }

  return {
    getState,
    registerGlobal,
    setModeLayer,
    pushModal,
    registerLayer,
    clearLayer,
    setLayerEnabled,
    getActiveLayers,
  }
}
