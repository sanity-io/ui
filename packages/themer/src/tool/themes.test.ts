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
const custom: CustomTheme = {slug: 'custom-1', title: 'Mine', options: {light: {accent: '#ff0000'}}}
const stateWithCustom: ThemerState = {active: null, custom: [custom], removed: [], order: []}

describe('resolveThemes', () => {
  it('lists the configured theme, the presets and the custom themes in that order', () => {
    const {themes, removed, active} = resolveThemes(stateWithCustom, {light: {accent: '#123456'}})

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
    const stock = resolveThemes(initialThemerState, {dark: {accent: DEFAULT_ACCENT}})

    expect(stock.themes.some((theme) => theme.slug === 'studio')).toBe(false)

    const configured = resolveThemes(initialThemerState, {
      ...verdant.options,
      light: {...verdant.options.light, accent: '#1CB485'},
    })

    expect(configured.themes.some((theme) => theme.slug === 'verdant')).toBe(false)
    expect(configured.themes.some((theme) => theme.slug === 'studio')).toBe(true)
  })

  it('sets removed themes aside and falls back to the configured theme', () => {
    const state: ThemerState = {
      active: 'verdant',
      custom: [custom],
      removed: ['verdant', 'custom-1'],
      order: [],
    }
    const {themes, removed, active} = resolveThemes(state, {light: {accent: '#123456'}})

    expect(themes.some((theme) => theme.slug === 'verdant')).toBe(false)
    expect(removed.map((theme) => theme.slug)).toEqual(['verdant', 'custom-1'])
    expect(active.slug).toBe(CONFIG_SLUG)
  })

  it('arranges the themes in the stored order, the rest after them in default order', () => {
    const {themes} = resolveThemes(
      {...stateWithCustom, order: ['custom-1', 'dew', 'unknown', CONFIG_SLUG]},
      {light: {accent: '#123456'}},
    )
    const slugs = themes.map((theme) => theme.slug)
    const rest = presets.map((preset) => preset.slug).filter((slug) => slug !== 'dew')

    expect(slugs).toEqual(['custom-1', 'dew', CONFIG_SLUG, ...rest])
  })

  it('keeps a removed theme in line for when it is restored', () => {
    const state: ThemerState = {
      ...stateWithCustom,
      removed: ['dew'],
      order: ['dew', 'custom-1', CONFIG_SLUG],
    }
    const {themes, removed} = resolveThemes(state, {light: {accent: '#123456'}})

    expect(themes.slice(0, 2).map((theme) => theme.slug)).toEqual(['custom-1', CONFIG_SLUG])
    expect(removed.map((theme) => theme.slug)).toEqual(['dew'])
    expect(
      resolveThemes({...state, removed: []}, {light: {accent: '#123456'}})
        .themes.slice(0, 3)
        .map((theme) => theme.slug),
    ).toEqual(['dew', 'custom-1', CONFIG_SLUG])
  })

  it('applies the picked theme', () => {
    const {active} = resolveThemes(
      {...stateWithCustom, active: 'custom-1'},
      {light: {accent: '#123456'}},
    )

    expect(active).toMatchObject({...custom, source: 'custom'})
    expect(
      resolveThemes({...stateWithCustom, active: 'unknown'}, {light: {accent: '#123456'}}).active
        .slug,
    ).toBe(CONFIG_SLUG)
  })
})

describe('theme helpers', () => {
  it('creates custom themes with slugs of their own', () => {
    const created = createCustomTheme('Mine', {light: {accent: '#ff0000'}})

    expect(created.slug).toMatch(/^custom-/)
    expect(created).toMatchObject({title: 'Mine', options: {light: {accent: '#ff0000'}}})
    expect(createCustomTheme('Other', {}).slug).not.toBe(created.slug)
  })

  it('titles duplicates and untitled themes', () => {
    expect(duplicateTitle('Verdant')).toBe('Verdant copy')
    expect(duplicateTitle('  ')).toBe('Untitled theme copy')
    expect(displayTitle(' Mine ')).toBe('Mine')
    expect(displayTitle('')).toBe('Untitled theme')
  })
})
