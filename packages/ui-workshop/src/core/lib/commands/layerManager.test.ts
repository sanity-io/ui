import {describe, expect, test, vi} from 'vitest'

import {createLayerManager} from './layerManager'
import type {CommandBinding} from './types'

describe('layerManager', () => {
  const mockBindings1: CommandBinding[] = [
    {type: 'chord', id: 'cmd1', keys: ['mod', '1'], handler: vi.fn()},
  ]

  const mockBindings2: CommandBinding[] = [
    {type: 'chord', id: 'cmd2', keys: ['mod', '2'], handler: vi.fn()},
  ]

  const mockBindings3: CommandBinding[] = [
    {type: 'chord', id: 'cmd3', keys: ['mod', '3'], handler: vi.fn()},
  ]

  describe('registerGlobal', () => {
    test('registers global layer', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)

      const state = manager.getState()
      expect(state.global).toBeTruthy()
      expect(state.global?.name).toBe('global')
      expect(state.global?.bindings).toEqual(mockBindings1)
      expect(state.global?.enabled).toBe(true)
    })

    test('unregister removes global layer', () => {
      const manager = createLayerManager()
      const unregister = manager.registerGlobal(mockBindings1)

      unregister()

      const state = manager.getState()
      expect(state.global).toBeNull()
    })

    test('replaces existing global layer', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.registerGlobal(mockBindings2)

      const state = manager.getState()
      expect(state.global?.bindings).toEqual(mockBindings2)
    })
  })

  describe('setModeLayer', () => {
    test('sets mode layer', () => {
      const manager = createLayerManager()
      manager.setModeLayer('canvas', mockBindings1)

      const state = manager.getState()
      expect(state.mode).toBeTruthy()
      expect(state.mode?.name).toBe('canvas')
      expect(state.mode?.bindings).toEqual(mockBindings1)
    })

    test('replaces existing mode layer', () => {
      const manager = createLayerManager()
      manager.setModeLayer('canvas', mockBindings1)
      manager.setModeLayer('editor', mockBindings2)

      const state = manager.getState()
      expect(state.mode?.name).toBe('editor')
      expect(state.mode?.bindings).toEqual(mockBindings2)
    })

    test('unregister removes mode layer', () => {
      const manager = createLayerManager()
      const unregister = manager.setModeLayer('canvas', mockBindings1)

      unregister()

      const state = manager.getState()
      expect(state.mode).toBeNull()
    })

    test('unregister only removes if still current', () => {
      const manager = createLayerManager()
      const unregister1 = manager.setModeLayer('canvas', mockBindings1)
      manager.setModeLayer('editor', mockBindings2)

      // This should not remove the editor layer
      unregister1()

      const state = manager.getState()
      expect(state.mode?.name).toBe('editor')
    })
  })

  describe('pushModal', () => {
    test('pushes modal onto stack', () => {
      const manager = createLayerManager()
      manager.pushModal('settings', mockBindings1)

      const state = manager.getState()
      expect(state.modals).toHaveLength(1)
      expect(state.modals[0].name).toBe('settings')
    })

    test('pushes multiple modals in order', () => {
      const manager = createLayerManager()
      manager.pushModal('settings', mockBindings1)
      manager.pushModal('confirm', mockBindings2)

      const state = manager.getState()
      expect(state.modals).toHaveLength(2)
      expect(state.modals[0].name).toBe('settings')
      expect(state.modals[1].name).toBe('confirm')
    })

    test('unregister removes modal', () => {
      const manager = createLayerManager()
      const unregister = manager.pushModal('settings', mockBindings1)

      unregister()

      const state = manager.getState()
      expect(state.modals).toHaveLength(0)
    })

    test('unregister removes specific modal from stack', () => {
      const manager = createLayerManager()
      const unregister1 = manager.pushModal('settings', mockBindings1)
      manager.pushModal('confirm', mockBindings2)

      unregister1()

      const state = manager.getState()
      expect(state.modals).toHaveLength(1)
      expect(state.modals[0].name).toBe('confirm')
    })

    test('supports exclusive modals', () => {
      const manager = createLayerManager()
      manager.pushModal('settings', mockBindings1, {exclusive: true})

      const state = manager.getState()
      expect(state.modals[0].exclusive).toBe(true)
    })
  })

  describe('clearLayer', () => {
    test('clears global layer', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)

      manager.clearLayer('global')

      const state = manager.getState()
      expect(state.global).toBeNull()
    })

    test('clears mode layer by name', () => {
      const manager = createLayerManager()
      manager.setModeLayer('canvas', mockBindings1)

      manager.clearLayer('canvas')

      const state = manager.getState()
      expect(state.mode).toBeNull()
    })

    test('clears modal layer by name', () => {
      const manager = createLayerManager()
      manager.pushModal('settings', mockBindings1)
      manager.pushModal('confirm', mockBindings2)

      manager.clearLayer('settings')

      const state = manager.getState()
      expect(state.modals).toHaveLength(1)
      expect(state.modals[0].name).toBe('confirm')
    })
  })

  describe('setLayerEnabled', () => {
    test('disables global layer', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)

      manager.setLayerEnabled('global', false)

      const state = manager.getState()
      expect(state.global?.enabled).toBe(false)
    })

    test('disables mode layer', () => {
      const manager = createLayerManager()
      manager.setModeLayer('canvas', mockBindings1)

      manager.setLayerEnabled('canvas', false)

      const state = manager.getState()
      expect(state.mode?.enabled).toBe(false)
    })

    test('disables modal layer', () => {
      const manager = createLayerManager()
      manager.pushModal('settings', mockBindings1)

      manager.setLayerEnabled('settings', false)

      const state = manager.getState()
      expect(state.modals[0].enabled).toBe(false)
    })

    test('re-enables disabled layer', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setLayerEnabled('global', false)

      manager.setLayerEnabled('global', true)

      const state = manager.getState()
      expect(state.global?.enabled).toBe(true)
    })
  })

  describe('getActiveLayers', () => {
    test('returns all layers when no exclusive modal', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setModeLayer('canvas', mockBindings2)
      manager.pushModal('settings', mockBindings3)

      const layers = manager.getActiveLayers(true)

      expect(layers).toHaveLength(3)
      expect(layers[0].name).toBe('settings') // modal first
      expect(layers[1].name).toBe('canvas') // mode second
      expect(layers[2].name).toBe('global') // global last
    })

    test('excludes mode layer when exclusive modal present', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setModeLayer('canvas', mockBindings2)
      manager.pushModal('settings', mockBindings3, {exclusive: true})

      const layers = manager.getActiveLayers(true)

      expect(layers).toHaveLength(2)
      expect(layers[0].name).toBe('settings')
      expect(layers[1].name).toBe('global')
    })

    test('excludes global when exclusive modal and includeGlobal is false', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setModeLayer('canvas', mockBindings2)
      manager.pushModal('settings', mockBindings3, {exclusive: true})

      const layers = manager.getActiveLayers(false)

      expect(layers).toHaveLength(1)
      expect(layers[0].name).toBe('settings')
    })

    test('excludes disabled layers', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setModeLayer('canvas', mockBindings2)
      manager.setLayerEnabled('canvas', false)

      const layers = manager.getActiveLayers(true)

      expect(layers).toHaveLength(1)
      expect(layers[0].name).toBe('global')
    })

    test('returns modals in LIFO order (topmost first)', () => {
      const manager = createLayerManager()
      manager.pushModal('modal1', mockBindings1)
      manager.pushModal('modal2', mockBindings2)
      manager.pushModal('modal3', mockBindings3)

      const layers = manager.getActiveLayers(true)

      expect(layers[0].name).toBe('modal3')
      expect(layers[1].name).toBe('modal2')
      expect(layers[2].name).toBe('modal1')
    })

    test('handles multiple modals with only one exclusive', () => {
      const manager = createLayerManager()
      manager.registerGlobal(mockBindings1)
      manager.setModeLayer('canvas', mockBindings2)
      manager.pushModal('modal1', mockBindings1)
      manager.pushModal('modal2', mockBindings2, {exclusive: true})
      manager.pushModal('modal3', mockBindings3)

      const layers = manager.getActiveLayers(true)

      // Should have all 3 modals + global, but not mode
      expect(layers).toHaveLength(4)
      expect(layers.some((l) => l.name === 'canvas')).toBe(false)
      expect(layers[0].name).toBe('modal3')
      expect(layers[1].name).toBe('modal2')
      expect(layers[2].name).toBe('modal1')
      expect(layers[3].name).toBe('global')
    })
  })
})
