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
  themerReducer,
} from './themes'

const verdant = presets.find((preset) => preset.slug === 'verdant')!
const custom: CustomTheme = {slug: 'custom-1', title: 'Mine', options: {accent: '#ff0000'}}
const stateWithCustom: ThemerState = {active: null, custom: [custom], removed: []}

describe('themerReducer', () => {
  it('picks a theme, and picking the configured theme applies nothing', () => {
    const picked = themerReducer(initialThemerState, {type: 'pick', slug: 'verdant'})

    expect(picked.active).toBe('verdant')
    expect(themerReducer(picked, {type: 'pick', slug: CONFIG_SLUG}).active).toBeNull()
    expect(themerReducer(picked, {type: 'pick', slug: 'verdant'})).toBe(picked)
  })

  it('adds a theme and applies it', () => {
    const added = themerReducer(initialThemerState, {type: 'add', theme: custom})

    expect(added).toEqual({active: 'custom-1', custom: [custom], removed: []})
    expect(themerReducer(added, {type: 'add', theme: custom})).toBe(added)
  })

  it('updates only custom themes, keeping the options identity when only the title changes', () => {
    const renamed = themerReducer(stateWithCustom, {type: 'update', slug: 'custom-1', title: 'Ours'})

    expect(renamed.custom[0].title).toBe('Ours')
    expect(renamed.custom[0].options).toBe(custom.options)

    const recolored = themerReducer(stateWithCustom, {
      type: 'update',
      slug: 'custom-1',
      options: {accent: '#00ff00'},
    })

    expect(recolored.custom[0]).toEqual({...custom, options: {accent: '#00ff00'}})
    expect(themerReducer(stateWithCustom, {type: 'update', slug: 'verdant', title: 'Nope'})).toBe(
      stateWithCustom,
    )
  })

  it('removes themes, falling back to the configured theme when the applied one goes', () => {
    const active: ThemerState = {...stateWithCustom, active: 'custom-1'}
    const removed = themerReducer(active, {type: 'remove', slug: 'custom-1'})

    expect(removed).toEqual({active: null, custom: [custom], removed: ['custom-1']})
    expect(themerReducer(removed, {type: 'remove', slug: 'custom-1'})).toBe(removed)
    expect(themerReducer(active, {type: 'remove', slug: CONFIG_SLUG})).toBe(active)

    const other = themerReducer(active, {type: 'remove', slug: 'verdant'})

    expect(other.active).toBe('custom-1')
    expect(other.removed).toEqual(['verdant'])
  })

  it('restores removed themes', () => {
    const removed: ThemerState = {...stateWithCustom, removed: ['verdant', 'custom-1']}

    expect(themerReducer(removed, {type: 'restore', slug: 'verdant'}).removed).toEqual(['custom-1'])
    expect(themerReducer(removed, {type: 'restore', slug: 'dew'})).toBe(removed)
  })

  it('deletes custom themes for good', () => {
    const removed: ThemerState = {active: 'custom-1', custom: [custom], removed: ['custom-1']}

    expect(themerReducer(removed, {type: 'delete', slug: 'custom-1'})).toEqual(initialThemerState)
    expect(themerReducer(removed, {type: 'delete', slug: 'verdant'})).toBe(removed)
  })
})

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
