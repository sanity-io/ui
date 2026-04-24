import {tokenSystem} from '@sanity/ui-tokens/system'
import {describe, expect, test} from 'vitest'

import {findEntities} from './findEntities'
import {getFigmaModeTokenSets, getSourceTokenSets} from './layers'

describe('getFigmaModeTokenSets', () => {
  test('returns default mode for layer kind', () => {
    const paletteLayer = tokenSystem.layers.find((l) => l.name === 'palette')
    expect(paletteLayer).toBeDefined()

    if (!paletteLayer || paletteLayer.kind !== 'layer') return

    const result = getFigmaModeTokenSets(paletteLayer)

    expect(Object.keys(result)).toEqual(['default'])
    expect(result['default']).toBe(paletteLayer.tokenSet)
  })

  test('returns variant modes for variant kind in declared order', () => {
    const elementToneLayer = tokenSystem.layers.find((l) => l.name === 'elementTone')
    expect(elementToneLayer).toBeDefined()

    if (!elementToneLayer || elementToneLayer.kind !== 'variant') return

    const result = getFigmaModeTokenSets(elementToneLayer)

    expect(Object.keys(result)).toEqual([...elementToneLayer.variants])

    // Each variant should have its corresponding token set
    for (const variant of elementToneLayer.variants) {
      expect(result[variant]).toBe(elementToneLayer.tokenSets[variant])
    }
  })

  test('returns state modes in source object order', () => {
    const selectableLayer = tokenSystem.layers.find((l) => l.name === 'selectable')
    expect(selectableLayer).toBeDefined()

    if (!selectableLayer || selectableLayer.kind !== 'state') return

    const result = getFigmaModeTokenSets(selectableLayer)

    // Lock down exact state order - object key order is now the contract
    expect(Object.keys(result)).toEqual([
      'enabled',
      'hovered',
      'pressed',
      'selected',
      'disabled',
    ])

    // Each state should have a projected token set
    for (const state of Object.keys(result)) {
      expect(result[state]).toBeDefined()
      expect(typeof result[state]).toBe('object')
    }
  })

  test('state projection flattens state keys from variable paths', () => {
    const selectableLayer = tokenSystem.layers.find((l) => l.name === 'selectable')
    expect(selectableLayer).toBeDefined()

    if (!selectableLayer || selectableLayer.kind !== 'state') return

    const result = getFigmaModeTokenSets(selectableLayer)

    // Verify projected structure at token level
    const enabledTokens = result['enabled'] as {
      selectable?: {
        color?: {
          bg?: unknown
          enabled?: unknown
        }
      }
    }

    // Should have selectable.color.bg (not selectable.color.enabled.bg)
    expect(enabledTokens?.selectable?.color?.bg).toBeDefined()
    expect(enabledTokens?.selectable?.color?.enabled).toBeUndefined()

    // Verify at Figma variable level
    const enabled = findEntities(result['enabled'])
    const hovered = findEntities(result['hovered'])

    // Variables should be named selectable/color/bg (not selectable/color/enabled/bg)
    expect(enabled.figmaVars.some((v) => v.name === 'selectable/color/bg')).toBe(true)
    expect(hovered.figmaVars.some((v) => v.name === 'selectable/color/bg')).toBe(true)

    // State should not appear in variable path
    expect(enabled.figmaVars.some((v) => v.name === 'selectable/color/enabled/bg')).toBe(false)
    expect(hovered.figmaVars.some((v) => v.name === 'selectable/color/hovered/bg')).toBe(false)
  })

  test('returns unprojected source token set for state kind', () => {
    const selectableLayer = tokenSystem.layers.find((l) => l.name === 'selectable')
    expect(selectableLayer).toBeDefined()

    if (!selectableLayer || selectableLayer.kind !== 'state') return

    const sourceTokenSets = getSourceTokenSets(selectableLayer)
    const figmaModeTokenSets = getFigmaModeTokenSets(selectableLayer)

    expect(sourceTokenSets).toEqual([selectableLayer.tokenSet])

    const source = sourceTokenSets[0] as {
      selectable?: {
        color?: {
          enabled?: unknown
        }
      }
    }

    const projectedEnabled = figmaModeTokenSets['enabled'] as {
      selectable?: {
        color?: {
          enabled?: unknown
          bg?: unknown
        }
      }
    }

    // Source has the nested enabled state
    expect(source.selectable?.color?.enabled).toBeDefined()

    // Projected removes the enabled nesting level
    expect(projectedEnabled.selectable?.color?.enabled).toBeUndefined()
    expect(projectedEnabled.selectable?.color?.bg).toBeDefined()
  })
})
