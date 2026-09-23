import {describe, expect, it} from 'vitest'
import {createActor} from 'xstate'

import {presets} from '../theme/presets'
import {selectStoredState, ThemerInput, themerMachine} from './machine'
import {CONFIG_SLUG, CustomTheme, initialThemerState, ThemerState} from './themes'

const baseOptions = {light: {accent: '#123456'}}
const custom: CustomTheme = {slug: 'custom-1', title: 'Mine', options: {light: {accent: '#ff0000'}}}
const verdant = presets.find((preset) => preset.slug === 'verdant')!

function start(stored: ThemerState = initialThemerState, input: Partial<ThemerInput> = {}) {
  return createActor(themerMachine, {input: {baseOptions, stored, ...input}}).start()
}

function startWithCustom(overrides: Partial<ThemerState> = {}) {
  return start({active: null, custom: [custom], removed: [], ...overrides})
}

describe('themerMachine', () => {
  it('starts closed in the list, from the stored state', () => {
    const stored: ThemerState = {active: 'verdant', custom: [custom], removed: ['dew']}
    const actor = start(stored)
    const snapshot = actor.getSnapshot()

    expect(snapshot.matches({sidebar: 'closed', flow: 'list'})).toBe(true)
    expect(selectStoredState(snapshot)).toEqual(stored)
    expect(snapshot.context.baseOptions).toBe(baseOptions)
    expect(snapshot.context.editing).toBeNull()
  })

  it('toggles and closes the sidebar without touching the flow', () => {
    const actor = startWithCustom()

    actor.send({type: 'theme.edit', slug: 'custom-1'})
    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'open', flow: 'edit'})).toBe(true)

    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'closed', flow: 'edit'})).toBe(true)

    actor.send({type: 'sidebar.toggle'})
    actor.send({type: 'sidebar.close'})
    expect(actor.getSnapshot().matches({sidebar: 'closed', flow: 'edit'})).toBe(true)
  })

  describe('picking', () => {
    it('applies a theme, and picking the configured theme applies nothing', () => {
      const actor = start()

      actor.send({type: 'theme.pick', slug: 'verdant'})
      expect(actor.getSnapshot().context.active).toBe('verdant')

      actor.send({type: 'theme.pick', slug: CONFIG_SLUG})
      expect(actor.getSnapshot().context.active).toBeNull()
    })
  })

  describe('adding', () => {
    it('adds a theme based on the applied one and opens it in the editor', () => {
      const actor = start({...initialThemerState, active: 'verdant'})

      actor.send({type: 'theme.add'})

      const {context} = actor.getSnapshot()

      expect(actor.getSnapshot().matches({flow: 'edit'})).toBe(true)
      expect(context.custom).toHaveLength(1)
      expect(context.custom[0]).toMatchObject({title: 'Untitled theme', options: verdant.options})
      expect(context.custom[0].slug).toMatch(/^custom-/)
      expect(context.active).toBe(context.custom[0].slug)
      expect(context.editing).toEqual({slug: context.custom[0].slug, focusTitle: true})
    })

    it('adds a theme from given colors, like the palette of an image, without asking for a title', () => {
      const actor = start()
      const palette = {
        dominant: '#e11d48',
        vibrant: '#e11d48',
        lightVibrant: null,
        darkVibrant: null,
        muted: '#7a7e8a',
        lightMuted: null,
        darkMuted: null,
      }

      actor.send({
        type: 'theme.add',
        title: 'sunset beach',
        options: {light: {accent: '#e11d48'}},
        palette,
      })

      const {context} = actor.getSnapshot()

      expect(actor.getSnapshot().matches({flow: 'edit'})).toBe(true)
      expect(context.custom[0]).toMatchObject({
        title: 'sunset beach',
        options: {light: {accent: '#e11d48'}},
        palette,
      })
      expect(context.editing).toEqual({slug: context.custom[0].slug, focusTitle: false})

      actor.send({
        type: 'theme.update',
        slug: context.custom[0].slug,
        options: {dark: {accent: '#7a7e8a'}},
        palette: {...palette, vibrant: '#7a7e8a'},
      })
      expect(actor.getSnapshot().context.custom[0]).toMatchObject({
        options: {dark: {accent: '#7a7e8a'}},
        palette: {...palette, vibrant: '#7a7e8a'},
      })
    })

    it('keeps the image of a theme for the session, and lets it go with the theme', () => {
      const actor = start()
      const palette = {
        dominant: '#e11d48',
        vibrant: '#e11d48',
        lightVibrant: null,
        darkVibrant: null,
        muted: null,
        lightMuted: null,
        darkMuted: null,
      }

      actor.send({type: 'theme.add', title: 'sunset', palette, imageUrl: 'blob:one'})

      const slug = actor.getSnapshot().context.custom[0].slug

      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:one'})
      expect(selectStoredState(actor.getSnapshot())).not.toHaveProperty('images')

      actor.send({type: 'theme.update', slug, palette, imageUrl: 'blob:two'})
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})

      actor.send({type: 'theme.update', slug: 'verdant', imageUrl: 'blob:nope'})
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})

      actor.send({type: 'theme.duplicate', slug})
      const copy = actor.getSnapshot().context.custom[1]

      expect(copy.palette).toEqual(palette)
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})

      actor.send({type: 'theme.remove', slug})
      actor.send({type: 'theme.delete', slug})
      expect(actor.getSnapshot().context.images).toEqual({})
    })

    it('duplicates listed and removed themes into the editor', () => {
      const actor = startWithCustom({removed: ['custom-1']})

      actor.send({type: 'theme.duplicate', slug: 'verdant'})

      let {context} = actor.getSnapshot()

      expect(actor.getSnapshot().matches({flow: 'edit'})).toBe(true)
      expect(context.custom.at(-1)).toMatchObject({title: 'Verdant copy', options: verdant.options})
      expect(context.editing).toEqual({slug: context.active, focusTitle: true})

      actor.send({type: 'theme.duplicate', slug: 'custom-1'})
      context = actor.getSnapshot().context
      expect(context.custom.at(-1)).toMatchObject({title: 'Mine copy', options: custom.options})
      expect(context.custom).toHaveLength(3)
    })

    it('does not open the editor when there is nothing to duplicate', () => {
      const actor = start()

      actor.send({type: 'theme.duplicate', slug: 'unknown'})

      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
      expect(actor.getSnapshot().context.custom).toEqual([])
      expect(actor.getSnapshot().context.editing).toBeNull()
    })
  })

  describe('editing', () => {
    it('edits and applies custom themes only', () => {
      const actor = startWithCustom()

      actor.send({type: 'theme.edit', slug: 'verdant'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)

      actor.send({type: 'theme.edit', slug: 'custom-1'})
      expect(actor.getSnapshot().matches({flow: 'edit'})).toBe(true)
      expect(actor.getSnapshot().context.active).toBe('custom-1')
      expect(actor.getSnapshot().context.editing).toEqual({slug: 'custom-1', focusTitle: false})
    })

    it('does not edit removed themes', () => {
      const actor = startWithCustom({removed: ['custom-1']})

      actor.send({type: 'theme.edit', slug: 'custom-1'})

      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
    })

    it('updates a theme, keeping the options identity when only the title changes', () => {
      const actor = startWithCustom()

      actor.send({type: 'theme.update', slug: 'custom-1', title: 'Ours'})
      expect(actor.getSnapshot().context.custom[0].title).toBe('Ours')
      expect(actor.getSnapshot().context.custom[0].options).toBe(custom.options)

      actor.send({type: 'theme.update', slug: 'custom-1', options: {dark: {accent: '#00ff00'}}})
      expect(actor.getSnapshot().context.custom[0]).toEqual({
        slug: 'custom-1',
        title: 'Ours',
        options: {dark: {accent: '#00ff00'}},
      })

      actor.send({type: 'theme.update', slug: 'verdant', title: 'Nope'})
      expect(actor.getSnapshot().context.custom).toHaveLength(1)
    })

    it('leaves the editor when done, and when the theme is removed or deleted', () => {
      const actor = startWithCustom()

      actor.send({type: 'theme.edit', slug: 'custom-1'})
      actor.send({type: 'flow.list'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
      expect(actor.getSnapshot().context.editing).toBeNull()

      actor.send({type: 'theme.edit', slug: 'custom-1'})
      actor.send({type: 'theme.remove', slug: 'custom-1'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
      expect(actor.getSnapshot().context.editing).toBeNull()
      expect(actor.getSnapshot().context.active).toBeNull()

      actor.send({type: 'theme.restore', slug: 'custom-1'})
      actor.send({type: 'theme.edit', slug: 'custom-1'})
      actor.send({type: 'theme.delete', slug: 'custom-1'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
      expect(actor.getSnapshot().context.custom).toEqual([])
    })

    it('stays in the editor while other themes come and go', () => {
      const actor = startWithCustom({active: 'custom-1'})

      actor.send({type: 'theme.edit', slug: 'custom-1'})
      actor.send({type: 'theme.remove', slug: 'verdant'})

      expect(actor.getSnapshot().matches({flow: 'edit'})).toBe(true)
      expect(actor.getSnapshot().context.active).toBe('custom-1')
    })
  })

  describe('removing and restoring', () => {
    it('removes themes, falling back to the configured theme when the applied one goes', () => {
      const actor = startWithCustom({active: 'custom-1'})

      actor.send({type: 'theme.remove', slug: CONFIG_SLUG})
      expect(actor.getSnapshot().context.removed).toEqual([])

      actor.send({type: 'theme.remove', slug: 'verdant'})
      expect(actor.getSnapshot().context.active).toBe('custom-1')

      actor.send({type: 'theme.remove', slug: 'custom-1'})
      actor.send({type: 'theme.remove', slug: 'custom-1'})
      expect(selectStoredState(actor.getSnapshot())).toEqual({
        active: null,
        custom: [custom],
        removed: ['verdant', 'custom-1'],
      })
    })

    it('only shows the removed themes while there are some', () => {
      const actor = startWithCustom()

      actor.send({type: 'flow.removed'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)

      actor.send({type: 'theme.remove', slug: 'verdant'})
      actor.send({type: 'theme.remove', slug: 'custom-1'})
      actor.send({type: 'flow.removed'})
      expect(actor.getSnapshot().matches({flow: 'removed'})).toBe(true)

      actor.send({type: 'theme.restore', slug: 'verdant'})
      expect(actor.getSnapshot().matches({flow: 'removed'})).toBe(true)
      expect(actor.getSnapshot().context.removed).toEqual(['custom-1'])

      actor.send({type: 'theme.delete', slug: 'custom-1'})
      expect(actor.getSnapshot().matches({flow: 'list'})).toBe(true)
      expect(selectStoredState(actor.getSnapshot())).toEqual(initialThemerState)
    })

    it('deletes custom themes only', () => {
      const actor = startWithCustom({active: 'custom-1', removed: ['custom-1']})

      actor.send({type: 'theme.delete', slug: 'verdant'})
      expect(actor.getSnapshot().context.removed).toEqual(['custom-1'])

      actor.send({type: 'theme.delete', slug: 'custom-1'})
      expect(selectStoredState(actor.getSnapshot())).toEqual(initialThemerState)
    })
  })
})
