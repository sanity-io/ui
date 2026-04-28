import {_colorSchemeTokens} from '@sanity/ui-tokens/build/color/_scheme'
import {buttonModeTokens} from '@sanity/ui-tokens/component/button/mode'
import {fontTokens} from '@sanity/ui-tokens/primitive/font'
import {tokenSystem} from '@sanity/ui-tokens/system'
import {describe, expect, test} from 'vitest'

import {findEntities} from './findEntities'
import {getFigmaModeTokenSets} from './layers'
import type {SanityFigmaFontStyleNode} from './types/styles'

describe('findEntities', () => {
  describe('Figma mode token set processing', () => {
    test('should process all Figma mode token sets without errors', () => {
      for (const layer of tokenSystem.layers) {
        const modeTokenSets = getFigmaModeTokenSets(layer)

        for (const [mode, tokens] of Object.entries(modeTokenSets)) {
          let result: ReturnType<typeof findEntities>

          try {
            result = findEntities(tokens)
          } catch (err) {
            throw new Error(
              `Failed to process ${layer.name}/${mode}: ${
                err instanceof Error ? err.message : String(err)
              }`,
            )
          }

          expect(result).toHaveProperty('figmaVars')
          expect(result).toHaveProperty('figmaStyles')
          expect(Array.isArray(result.figmaVars)).toBe(true)
          expect(Array.isArray(result.figmaStyles)).toBe(true)
        }
      }
    })

    test('should return expected structure for all layers', () => {
      const results = tokenSystem.layers.flatMap((layer) => {
        const modeTokenSets = getFigmaModeTokenSets(layer)
        return Object.values(modeTokenSets).map((tokens) => findEntities(tokens))
      })

      expect(results.length).toBeGreaterThan(0)

      for (const result of results) {
        expect(result.figmaVars).toBeDefined()
        expect(result.figmaStyles).toBeDefined()
      }
    })
  })

  describe('font styles', () => {
    test('should extract font styles from font tokens', () => {
      const entities = findEntities(fontTokens)

      expect(entities.figmaStyles.length).toBeGreaterThan(0)

      const firstStyle = entities.figmaStyles[0]
      expect(firstStyle).toHaveProperty('name')
      expect(firstStyle).toHaveProperty('node')
      expect(firstStyle.node).toHaveProperty('type', 'font-style')
      expect(firstStyle.node).toHaveProperty('tokens')

      const tokens = (firstStyle.node as SanityFigmaFontStyleNode).tokens
      expect(tokens).toHaveProperty('family')
      expect(tokens).toHaveProperty('featureSettings')
      expect(tokens).toHaveProperty('scale')
      expect(tokens).toHaveProperty('weight')
    })

    test('should create unique font style names', () => {
      const entities = findEntities(fontTokens)
      const names = entities.figmaStyles.map((s) => s.name)
      const uniqueNames = new Set(names)

      expect(names.length).toBe(uniqueNames.size)
    })
  })

  describe('color scheme tokens', () => {
    test('should extract color variables from dark scheme', () => {
      const entities = findEntities(_colorSchemeTokens.dark)

      expect(entities.figmaVars.length).toBeGreaterThan(0)

      // Check that color vars have expected structure
      const colorVars = entities.figmaVars.filter((v) => v.value.type === 'color')
      expect(colorVars.length).toBeGreaterThan(0)

      for (const colorVar of colorVars) {
        expect(colorVar).toHaveProperty('name')
        expect(colorVar).toHaveProperty('value')
        expect(colorVar).toHaveProperty('scopes')
        expect(colorVar.value).toHaveProperty('type', 'color')
        expect(Array.isArray(colorVar.scopes)).toBe(true)
      }
    })

    test('should extract color variables from light scheme', () => {
      const entities = findEntities(_colorSchemeTokens.light)

      expect(entities.figmaVars.length).toBeGreaterThan(0)

      const colorVars = entities.figmaVars.filter((v) => v.value.type === 'color')
      expect(colorVars.length).toBeGreaterThan(0)
    })

    test('should create hierarchical paths for nested tokens', () => {
      const entities = findEntities(_colorSchemeTokens.dark)

      // Check that nested tokens have paths with slashes
      const nestedVars = entities.figmaVars.filter((v) => v.name.includes('/'))
      expect(nestedVars.length).toBeGreaterThan(0)
    })
  })

  describe('token types', () => {
    test('should handle color tokens', () => {
      const entities = findEntities(_colorSchemeTokens.dark)
      const colorVars = entities.figmaVars.filter((v) => v.value.type === 'color')

      expect(colorVars.length).toBeGreaterThan(0)

      for (const colorVar of colorVars) {
        expect(colorVar.value).toHaveProperty('r')
        expect(colorVar.value).toHaveProperty('g')
        expect(colorVar.value).toHaveProperty('b')
        expect(colorVar.value).toHaveProperty('a')
      }
    })

    test('should preserve scopes from token extensions', () => {
      const entities = findEntities(_colorSchemeTokens.dark)

      // Some tokens should have scopes
      const varsWithScopes = entities.figmaVars.filter((v) => v.scopes.length > 0)

      if (varsWithScopes.length > 0) {
        for (const varWithScope of varsWithScopes) {
          for (const scope of varWithScope.scopes) {
            expect(typeof scope).toBe('string')
            expect(scope.length).toBeGreaterThan(0)
          }
        }
      }
    })
  })

  describe('edge cases', () => {
    test('should handle empty token objects', () => {
      const entities = findEntities({})

      expect(entities.figmaVars).toEqual([])
      expect(entities.figmaStyles).toEqual([])
    })

    test('should build correct paths for deeply nested tokens', () => {
      const nested = {
        level1: {
          level2: {
            level3: {
              $type: 'color',
              $value: '#ff0000',
            },
          },
        },
      }

      const entities = findEntities(nested)

      expect(entities.figmaVars).toHaveLength(1)
      expect(entities.figmaVars[0].name).toBe('level1/level2/level3')
    })

    test('should handle parent path parameter', () => {
      const tokens = {
        color: {
          $type: 'color',
          $value: '#ff0000',
        },
      }

      const entities = findEntities(tokens, 'prefix')

      expect(entities.figmaVars).toHaveLength(1)
      expect(entities.figmaVars[0].name).toBe('prefix/color')
    })
  })

  describe('validation', () => {
    test('should throw on unsupported token types', () => {
      const unsupported = {
        test: {
          $type: 'unsupported-type',
          $value: 'test',
        },
      }

      expect(() => findEntities(unsupported)).toThrow(/Unhandled node type/)
    })
  })

  describe('variant layer mode injection', () => {
    test('should inject mode name into style paths for variant layers', () => {
      const buttonModeLayer = tokenSystem.layers.find((l) => l.name === 'buttonMode')
      expect(buttonModeLayer).toBeDefined()
      expect(buttonModeLayer!.kind).toBe('variant')

      // Test default mode
      const defaultResult = findEntities(buttonModeTokens.default, undefined, {
        modeKey: 'default',
      })

      const defaultShadow = defaultResult.figmaStyles.find((s) => s.name.includes('boxShadow'))
      expect(defaultShadow).toBeDefined()
      expect(defaultShadow!.name).toBe('button/default/boxShadow')

      // Test ghost mode
      const ghostResult = findEntities(buttonModeTokens.ghost, undefined, {
        modeKey: 'ghost',
      })

      const ghostShadow = ghostResult.figmaStyles.find((s) => s.name.includes('boxShadow'))
      expect(ghostShadow).toBeDefined()
      expect(ghostShadow!.name).toBe('button/ghost/boxShadow')

      // Test bleed mode
      const bleedResult = findEntities(buttonModeTokens.bleed, undefined, {
        modeKey: 'bleed',
      })

      const bleedShadow = bleedResult.figmaStyles.find((s) => s.name.includes('boxShadow'))
      expect(bleedShadow).toBeDefined()
      expect(bleedShadow!.name).toBe('button/bleed/boxShadow')
    })

    test('should not inject mode name into variable paths for variant layers', () => {
      const buttonModeLayer = tokenSystem.layers.find((l) => l.name === 'buttonMode')
      expect(buttonModeLayer).toBeDefined()

      const defaultResult = findEntities(buttonModeTokens.default, undefined, {
        modeKey: 'default',
      })

      // Variables should not have mode in path (modes are handled via modeId)
      const colorVars = defaultResult.figmaVars.filter((v) => v.name.includes('color'))
      expect(colorVars.length).toBeGreaterThan(0)

      for (const colorVar of colorVars) {
        // Should not contain '/default/' or '/ghost/' or '/bleed/'
        expect(colorVar.name).not.toMatch(/\/(default|ghost|bleed)\//)
      }
    })
  })
})
