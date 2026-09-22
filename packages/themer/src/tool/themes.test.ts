import {describe, expect, it} from 'vitest'

import {DEFAULT_ACCENT} from '../theme/options'
import {presets} from '../theme/presets'
import {
  CONFIG_SLUG,
  createCustomTheme,
  CustomTheme,
  displayTitle,
  duplicateTitle,
  initialThemerState,
  resolveThemes,
  ThemerState,
} from './themes'

const verdant = presets.find((preset) => preset.slug === 'verdant')!
const custom: CustomTheme = {slug: 'custom-1', title: 'Mine', options: {accent: '#ff0000'}}
const stateWithCustom: ThemerState = {active: null, custom: [custom], removed: []}

describe('resolveThemes', () => {
  it('lists the configured theme, the presets and the custom themes in that order', () => {
    const {themes, removed, active} = resolveThemes(stateWithCustom, {accent: '#123456'})

    expect(themes.map((theme) => theme.slug)).toEqual([
      CONFIG_SLUG,
      ...presets.map((preset) => preset.slug),
      'custom-1',
    ])
    expect(themes[0]).toMatchObject({title: 'Studio config', source: 'config'})
    expect(themes[1].source).toBe('preset')
    expect(themes.at(-1)).toMatchObject({...custom, source: 'custom'})
    expect(removed).toEqual([])
    expect(active).toBe(themes[0])
  })

  it('keeps the options identity of every theme', () => {
    const {themes} = resolveThemes(stateWithCustom, verdant.options)

    expect(themes[0].options).toBe(verdant.options)
    expect(themes.find((theme) => theme.slug === 'dew')?.options).toBe(
      presets.find((preset) => preset.slug === 'dew')?.options,
    )
    expect(themes.at(-1)?.options).toBe(custom.options)
  })

  it('hides presets that would only repeat the configured theme', () => {
    const stock = resolveThemes(initialThemerState, {accent: DEFAULT_ACCENT})

    expect(stock.themes.some((theme) => theme.slug === 'studio')).toBe(false)

    const configured = resolveThemes(initialThemerState, {...verdant.options, accent: '#1CB485'})

    expect(configured.themes.some((theme) => theme.slug === 'verdant')).toBe(false)
    expect(configured.themes.some((theme) => theme.slug === 'studio')).toBe(true)
  })

  it('sets removed themes aside and falls back to the configured theme', () => {
    const state: ThemerState = {active: 'verdant', custom: [custom], removed: ['verdant', 'custom-1']}
    const {themes, removed, active} = resolveThemes(state, {accent: '#123456'})

    expect(themes.some((theme) => theme.slug === 'verdant')).toBe(false)
    expect(removed.map((theme) => theme.slug)).toEqual(['verdant', 'custom-1'])
    expect(active.slug).toBe(CONFIG_SLUG)
  })

  it('applies the picked theme', () => {
    const {active} = resolveThemes({...stateWithCustom, active: 'custom-1'}, {accent: '#123456'})

    expect(active).toMatchObject({...custom, source: 'custom'})
    expect(
      resolveThemes({...stateWithCustom, active: 'unknown'}, {accent: '#123456'}).active.slug,
    ).toBe(CONFIG_SLUG)
  })
})

describe('theme helpers', () => {
  it('creates custom themes with slugs of their own', () => {
    const created = createCustomTheme('Mine', {accent: '#ff0000'})

    expect(created.slug).toMatch(/^custom-/)
    expect(created).toMatchObject({title: 'Mine', options: {accent: '#ff0000'}})
    expect(createCustomTheme('Other', {accent: '#ff0000'}).slug).not.toBe(created.slug)
  })

  it('titles duplicates and untitled themes', () => {
    expect(duplicateTitle('Verdant')).toBe('Verdant copy')
    expect(duplicateTitle('  ')).toBe('Untitled theme copy')
    expect(displayTitle(' Mine ')).toBe('Mine')
    expect(displayTitle('')).toBe('Untitled theme')
  })
})
