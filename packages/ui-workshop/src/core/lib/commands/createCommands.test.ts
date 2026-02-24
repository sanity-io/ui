/**
 * @vitest-environment jsdom
 */
import {describe, expect, test, vi} from 'vitest'

import {createCommands} from './createCommands'

describe('createCommands', () => {
  // Detect platform for mod key
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform)

  function createKeyEvent(
    key: string,
    modifiers?: {
      ctrlKey?: boolean
      metaKey?: boolean
      shiftKey?: boolean
      altKey?: boolean
      mod?: boolean
    },
  ): KeyboardEvent {
    const mods = {
      ctrlKey: modifiers?.ctrlKey ?? false,
      metaKey: modifiers?.metaKey ?? false,
      shiftKey: modifiers?.shiftKey ?? false,
      altKey: modifiers?.altKey ?? false,
    }

    if (modifiers?.mod) {
      if (isMac) {
        mods.metaKey = true
      } else {
        mods.ctrlKey = true
      }
    }

    return new KeyboardEvent('keydown', {
      key,
      ...mods,
      bubbles: true,
    })
  }

  describe('chord shortcuts', () => {
    test('triggers command on matching chord', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([
        {
          type: 'chord',
          id: 'test.command',
          keys: ['mod', '0'],
          handler,
        },
      ])

      window.dispatchEvent(createKeyEvent('0', {mod: true}))

      expect(handler).toHaveBeenCalledWith({
        event: expect.any(KeyboardEvent),
        source: 'keyboard',
      })

      commands.unsubscribe()
    })

    test('does not trigger with wrong modifiers', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([
        {
          type: 'chord',
          id: 'test.command',
          keys: ['mod', '0'],
          handler,
        },
      ])

      window.dispatchEvent(createKeyEvent('0', {shiftKey: true}))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('prevents default by default', () => {
      const commands = createCommands()
      const handler = vi.fn()
      commands.registerGlobal([
        {
          type: 'chord',
          id: 'test.command',
          keys: ['mod', '0'],
          handler,
        },
      ])

      const event = createKeyEvent('0', {mod: true})
      const preventDefault = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefault).toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('respects preventDefault: false', () => {
      const commands = createCommands()
      const handler = vi.fn()
      commands.registerGlobal([
        {
          type: 'chord',
          id: 'test.command',
          keys: ['mod', '0'],
          preventDefault: false,
          handler,
        },
      ])

      const event = createKeyEvent('0', {mod: true})
      const preventDefault = vi.spyOn(event, 'preventDefault')
      window.dispatchEvent(event)

      expect(preventDefault).not.toHaveBeenCalled()

      commands.unsubscribe()
    })
  })

  describe('sequence shortcuts', () => {
    test('triggers command on complete sequence', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'sequence', id: 'nav.home', keys: ['g', 'h'], handler}])

      window.dispatchEvent(createKeyEvent('g'))
      window.dispatchEvent(createKeyEvent('h'))

      expect(handler).toHaveBeenCalledWith({
        event: expect.any(KeyboardEvent),
        source: 'keyboard',
      })

      commands.unsubscribe()
    })

    test('does not trigger on incomplete sequence', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'sequence', id: 'nav.home', keys: ['g', 'h'], handler}])

      window.dispatchEvent(createKeyEvent('g'))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('resets on wrong key', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'sequence', id: 'nav.home', keys: ['g', 'h'], handler}])

      window.dispatchEvent(createKeyEvent('g'))
      window.dispatchEvent(createKeyEvent('x'))
      window.dispatchEvent(createKeyEvent('h'))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('does not start sequence with modifiers held', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'sequence', id: 'nav.home', keys: ['g', 'h'], handler}])

      window.dispatchEvent(createKeyEvent('g', {mod: true}))
      window.dispatchEvent(createKeyEvent('h'))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })
  })

  describe('layer precedence', () => {
    test('modal layers take precedence over mode', () => {
      const commands = createCommands()
      const modeHandler = vi.fn()
      const modalHandler = vi.fn()

      commands.setModeLayer('canvas', [
        {type: 'chord', id: 'mode.command', keys: ['mod', '0'], handler: modeHandler},
      ])
      commands.pushModal('settings', [
        {type: 'chord', id: 'modal.command', keys: ['mod', '0'], handler: modalHandler},
      ])

      window.dispatchEvent(createKeyEvent('0', {mod: true}))

      expect(modalHandler).toHaveBeenCalledWith(expect.any(Object))
      expect(modeHandler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('exclusive modal blocks mode layer', () => {
      const commands = createCommands()
      const globalHandler = vi.fn()
      const modeHandler = vi.fn()
      const modalHandler = vi.fn()

      commands.registerGlobal([
        {type: 'chord', id: 'global.command', keys: ['mod', 'g'], handler: globalHandler},
      ])
      commands.setModeLayer('canvas', [
        {type: 'chord', id: 'mode.command', keys: ['mod', '0'], handler: modeHandler},
      ])
      commands.pushModal(
        'settings',
        [{type: 'chord', id: 'modal.command', keys: ['mod', 's'], handler: modalHandler}],
        {
          exclusive: true,
        },
      )

      // Modal command should work
      window.dispatchEvent(createKeyEvent('s', {mod: true}))
      expect(modalHandler).toHaveBeenCalledWith(expect.any(Object))

      // Global command should work
      globalHandler.mockClear()
      window.dispatchEvent(createKeyEvent('g', {mod: true}))
      expect(globalHandler).toHaveBeenCalledWith(expect.any(Object))

      // Mode command should NOT work
      modeHandler.mockClear()
      window.dispatchEvent(createKeyEvent('0', {mod: true}))
      expect(modeHandler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('chords take precedence over sequences', () => {
      const commands = createCommands()
      const sequenceHandler = vi.fn()
      const chordHandler = vi.fn()

      commands.registerGlobal([
        {type: 'sequence', id: 'sequence.command', keys: ['g', 'h'], handler: sequenceHandler},
        {type: 'chord', id: 'chord.command', keys: ['mod', '0'], handler: chordHandler},
      ])

      // Start sequence
      window.dispatchEvent(createKeyEvent('g'))

      // Trigger chord (should cancel sequence)
      window.dispatchEvent(createKeyEvent('0', {mod: true}))
      expect(chordHandler).toHaveBeenCalledWith(expect.any(Object))

      // Try to complete sequence (should not work)
      sequenceHandler.mockClear()
      window.dispatchEvent(createKeyEvent('h'))
      expect(sequenceHandler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })
  })

  describe('event filtering', () => {
    test('ignores events from input elements', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'chord', id: 'test.command', keys: ['mod', '0'], handler}])

      const input = document.createElement('input')
      document.body.appendChild(input)

      const event = createKeyEvent('0', {mod: true})
      input.dispatchEvent(event)

      expect(handler).not.toHaveBeenCalled()

      document.body.removeChild(input)
      commands.unsubscribe()
    })

    test('respects allowInEditableTarget option', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([
        {
          type: 'chord',
          id: 'test.command',
          keys: ['mod', '0'],
          allowInEditableTarget: true,
          handler,
        },
      ])

      const input = document.createElement('input')
      document.body.appendChild(input)

      const event = createKeyEvent('0', {mod: true})
      input.dispatchEvent(event)

      expect(handler).toHaveBeenCalled()

      document.body.removeChild(input)
      commands.unsubscribe()
    })

    test('ignores key repeats by default', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'chord', id: 'test.command', keys: ['mod', '0'], handler}])

      const mods = isMac ? {metaKey: true} : {ctrlKey: true}
      const event = new KeyboardEvent('keydown', {
        key: '0',
        ...mods,
        repeat: true,
        bubbles: true,
      })
      window.dispatchEvent(event)

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('allows key repeats when allowRepeat is true', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([
        {type: 'chord', id: 'test.command', keys: ['mod', '0'], allowRepeat: true, handler},
      ])

      const mods = isMac ? {metaKey: true} : {ctrlKey: true}
      const event = new KeyboardEvent('keydown', {
        key: '0',
        ...mods,
        repeat: true,
        bubbles: true,
      })
      window.dispatchEvent(event)

      expect(handler).toHaveBeenCalledWith(expect.any(Object))

      commands.unsubscribe()
    })
  })

  describe('dynamic registration', () => {
    test('unregister removes bindings', () => {
      const commands = createCommands()
      const handler = vi.fn()

      const unregister = commands.registerGlobal([
        {type: 'chord', id: 'test.command', keys: ['mod', '0'], handler},
      ])

      unregister()

      window.dispatchEvent(createKeyEvent('0', {mod: true}))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('setLayerEnabled disables bindings', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.setModeLayer('canvas', [
        {type: 'chord', id: 'test.command', keys: ['mod', '0'], handler},
      ])

      commands.setLayerEnabled('canvas', false)

      window.dispatchEvent(createKeyEvent('0', {mod: true}))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })

    test('setEnabled disables all bindings', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'chord', id: 'test.command', keys: ['mod', '0'], handler}])

      commands.setEnabled(false)

      window.dispatchEvent(createKeyEvent('0', {mod: true}))

      expect(handler).not.toHaveBeenCalled()

      commands.unsubscribe()
    })
  })

  describe('observation', () => {
    test('getActiveBindings returns active bindings', () => {
      const commands = createCommands()
      const globalHandler = vi.fn()
      const modeHandler = vi.fn()

      commands.registerGlobal([
        {type: 'chord', id: 'global.command', keys: ['mod', '0'], handler: globalHandler},
      ])
      commands.setModeLayer('canvas', [
        {type: 'chord', id: 'mode.command', keys: ['mod', '1'], handler: modeHandler},
      ])

      const active = commands.getActiveBindings()

      expect(active).toHaveLength(2)
      expect(active.some((b) => b.id === 'global.command')).toBe(true)
      expect(active.some((b) => b.id === 'mode.command')).toBe(true)

      commands.unsubscribe()
    })

    test('subscribe immediately calls listener', () => {
      const commands = createCommands()
      const listener = vi.fn()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'chord', id: 'global.command', keys: ['mod', '0'], handler}])

      commands.subscribe(listener)

      expect(listener).toHaveBeenCalledWith(expect.arrayContaining([expect.any(Object)]))

      commands.unsubscribe()
    })

    test('subscribe notifies on layer changes', () => {
      const commands = createCommands()
      const listener = vi.fn()
      const handler = vi.fn()

      commands.subscribe(listener)
      listener.mockClear()

      commands.registerGlobal([{type: 'chord', id: 'global.command', keys: ['mod', '0'], handler}])

      expect(listener).toHaveBeenCalled()

      commands.unsubscribe()
    })
  })

  describe('run method', () => {
    test('can execute commands programmatically', () => {
      const commands = createCommands()
      const handler = vi.fn()

      commands.registerGlobal([{type: 'chord', id: 'test.command', keys: ['mod', 's'], handler}])

      commands.run('test.command', {source: 'api'})

      expect(handler).toHaveBeenCalledWith({source: 'api'})

      commands.unsubscribe()
    })
  })
})
