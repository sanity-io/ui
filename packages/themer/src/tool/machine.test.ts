import {afterEach, describe, expect, it, vi} from 'vitest'
import {createActor, SimulatedClock} from 'xstate'

import {presets} from '../theme/presets'
import {MOTION_DURATION, selectStoredState, ThemerInput, themerMachine} from './machine'
import {CONFIG_SLUG, CustomTheme, initialThemerState, resolveThemes, ThemerState} from './themes'

const baseOptions = {light: {accent: '#123456'}}
const custom: CustomTheme = {slug: 'custom-1', title: 'Mine', options: {light: {accent: '#ff0000'}}}
const verdant = presets.find((preset) => preset.slug === 'verdant')!

/** The clock the layout motions run on, so tests can let them finish */
const clock = new SimulatedClock()

function start(stored: ThemerState = initialThemerState, input: Partial<ThemerInput> = {}) {
  return createActor(themerMachine, {clock, input: {baseOptions, stored, ...input}}).start()
}

/** Lets a motion the layout never reports on run out */
function settle() {
  clock.increment(MOTION_DURATION)
}

function startWithCustom(overrides: Partial<ThemerState> = {}) {
  return start({active: null, custom: [custom], removed: [], order: [], ...overrides})
}

describe('themerMachine', () => {
  it('starts closed in the list with a single preview, from the stored state', () => {
    const stored: ThemerState = {
      active: 'verdant',
      custom: [custom],
      removed: ['dew'],
      order: ['dew', 'verdant'],
    }
    const actor = start(stored)
    const snapshot = actor.getSnapshot()

    expect(snapshot.matches({sidebar: 'closed', flow: 'list', preview: 'single'})).toBe(true)
    expect(selectStoredState(snapshot)).toEqual(stored)
    expect(snapshot.context.baseOptions).toBe(baseOptions)
    expect(snapshot.context.editing).toBeNull()
  })

  it('opens and closes the sidebar through a motion, without touching the flow', () => {
    const actor = startWithCustom()

    actor.send({type: 'theme.edit', slug: 'custom-1'})
    actor.send({type: 'sidebar.toggle'})
    // The panel shows from the first moment, and the layout is in motion
    expect(actor.getSnapshot().matches({sidebar: 'opening', flow: 'edit'})).toBe(true)
    expect(actor.getSnapshot().hasTag('panel')).toBe(true)
    expect(actor.getSnapshot().hasTag('moving')).toBe(true)

    settle()
    expect(actor.getSnapshot().matches({sidebar: 'open', flow: 'edit'})).toBe(true)
    expect(actor.getSnapshot().hasTag('moving')).toBe(false)

    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'closing', flow: 'edit'})).toBe(true)
    expect(actor.getSnapshot().hasTag('panel')).toBe(false)
    expect(actor.getSnapshot().hasTag('moving')).toBe(true)

    // The layout reporting its transition ends the motion before the timer would
    actor.send({type: 'layout.transitioned'})
    expect(actor.getSnapshot().matches({sidebar: 'closed', flow: 'edit'})).toBe(true)
    expect(actor.getSnapshot().hasTag('moving')).toBe(false)

    // Toggling again mid-motion turns the motion around
    actor.send({type: 'sidebar.toggle'})
    actor.send({type: 'sidebar.close'})
    expect(actor.getSnapshot().matches({sidebar: 'closing', flow: 'edit'})).toBe(true)
    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'opening', flow: 'edit'})).toBe(true)
  })

  it('splits the preview and back without touching the sidebar, the flow or the themes', () => {
    const actor = startWithCustom({active: 'custom-1'})

    actor.send({type: 'sidebar.toggle'})
    actor.send({type: 'theme.edit', slug: 'custom-1'})
    settle()
    const stored = selectStoredState(actor.getSnapshot())

    actor.send({type: 'preview.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'open', flow: 'edit', preview: 'splitting'})).toBe(
      true,
    )
    expect(actor.getSnapshot().hasTag('split')).toBe(true)
    expect(actor.getSnapshot().hasTag('moving')).toBe(true)
    expect(selectStoredState(actor.getSnapshot())).toEqual(stored)

    settle()
    expect(actor.getSnapshot().matches({preview: 'split'})).toBe(true)
    expect(actor.getSnapshot().hasTag('moving')).toBe(false)

    actor.send({type: 'preview.toggle'})
    expect(actor.getSnapshot().matches({preview: 'unsplitting'})).toBe(true)
    expect(actor.getSnapshot().hasTag('split')).toBe(false)

    settle()
    expect(actor.getSnapshot().matches({sidebar: 'open', flow: 'edit', preview: 'single'})).toBe(
      true,
    )
  })

  it('ends the split preview when the sidebar closes, from its header or the navbar', () => {
    const actor = start()

    actor.send({type: 'sidebar.toggle'})
    actor.send({type: 'preview.toggle'})
    settle()
    actor.send({type: 'sidebar.close'})
    // Both leave together
    expect(actor.getSnapshot().matches({sidebar: 'closing', preview: 'unsplitting'})).toBe(true)
    settle()
    expect(actor.getSnapshot().matches({sidebar: 'closed', preview: 'single'})).toBe(true)

    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().hasTag('panel')).toBe(true)
    expect(actor.getSnapshot().hasTag('split')).toBe(false)

    // From the navbar too, even while the split is still arriving
    actor.send({type: 'preview.toggle'})
    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'closing', preview: 'unsplitting'})).toBe(true)

    // Opening the sidebar is not a way to split
    actor.send({type: 'sidebar.toggle'})
    expect(actor.getSnapshot().matches({sidebar: 'opening', preview: 'unsplitting'})).toBe(true)
  })

  describe('picking', () => {
    it('is switching themes right after a pick, not after an edit', () => {
      const actor = startWithCustom()

      expect(actor.getSnapshot().hasTag('switching')).toBe(false)

      actor.send({type: 'theme.pick', slug: 'custom-1'})
      expect(actor.getSnapshot().hasTag('switching')).toBe(true)

      actor.send({type: 'layout.transitioned'})
      expect(actor.getSnapshot().hasTag('switching')).toBe(false)

      actor.send({type: 'theme.update', slug: 'custom-1', options: {light: {accent: '#00ff00'}}})
      expect(actor.getSnapshot().hasTag('switching')).toBe(false)

      // Without word from the layout, the switch is over after the motion's duration
      actor.send({type: 'theme.remove', slug: 'custom-1'})
      expect(actor.getSnapshot().hasTag('switching')).toBe(true)
      settle()
      expect(actor.getSnapshot().hasTag('switching')).toBe(false)
    })

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

      const revoke = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)

      actor.send({type: 'theme.add', title: 'sunset', palette, imageUrl: 'blob:one'})

      const slug = actor.getSnapshot().context.custom[0].slug

      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:one'})
      expect(selectStoredState(actor.getSnapshot())).not.toHaveProperty('images')

      // A new image releases the one it replaces
      actor.send({type: 'theme.update', slug, palette, imageUrl: 'blob:two'})
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})
      expect(revoke.mock.calls).toEqual([['blob:one']])

      actor.send({type: 'theme.update', slug: 'verdant', imageUrl: 'blob:nope'})
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})

      actor.send({type: 'theme.duplicate', slug})
      const copy = actor.getSnapshot().context.custom[1]

      expect(copy.palette).toEqual(palette)
      expect(actor.getSnapshot().context.images).toEqual({[slug]: 'blob:two'})

      actor.send({type: 'theme.remove', slug})
      actor.send({type: 'theme.delete', slug})
      expect(actor.getSnapshot().context.images).toEqual({})
      expect(revoke.mock.calls).toEqual([['blob:one'], ['blob:two']])
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

  describe('persisting', () => {
    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('writes the stored state on every change to it, and nothing else', () => {
      const written: string[] = []

      vi.stubGlobal('localStorage', {
        getItem: () => null,
        setItem: (_key: string, value: string) => void written.push(value),
        removeItem: () => undefined,
      })

      const actor = startWithCustom()

      // Once as it starts, which completes the migration of an earlier version's storage
      expect(written).toHaveLength(1)
      expect(JSON.parse(written[0])).toEqual(selectStoredState(actor.getSnapshot()))

      actor.send({type: 'sidebar.toggle'})
      actor.send({type: 'preview.toggle'})
      expect(written).toHaveLength(1)

      actor.send({type: 'theme.pick', slug: 'custom-1'})
      expect(written).toHaveLength(2)
      expect(JSON.parse(written[1])).toEqual(selectStoredState(actor.getSnapshot()))

      actor.send({type: 'theme.reorder', order: ['custom-1', CONFIG_SLUG]})
      actor.send({type: 'theme.remove', slug: 'custom-1'})
      expect(written).toHaveLength(4)
      expect(JSON.parse(written[3])).toEqual(selectStoredState(actor.getSnapshot()))
    })
  })

  describe('importing', () => {
    it('adds and applies a shared theme without opening the editor', () => {
      const actor = start()

      actor.send({type: 'sidebar.toggle'})
      actor.send({type: 'theme.import', title: 'Shared', options: {dark: {accent: '#ff0000'}}})

      const snapshot = actor.getSnapshot()
      const stored = selectStoredState(snapshot)

      expect(snapshot.hasTag('panel')).toBe(true)
      expect(snapshot.matches({flow: 'list'})).toBe(true)
      expect(stored.custom).toHaveLength(1)
      expect(stored.custom[0]).toMatchObject({
        title: 'Shared',
        options: {dark: {accent: '#ff0000'}},
      })
      expect(stored.active).toBe(stored.custom[0].slug)
      expect(snapshot.context.editing).toBeNull()
    })
  })

  describe('rearranging', () => {
    it('stores the order the listed themes were dragged into', () => {
      const actor = startWithCustom()
      const slugs = () =>
        resolveThemes(actor.getSnapshot().context, baseOptions).themes.map((theme) => theme.slug)
      const [first, second, ...rest] = slugs()

      actor.send({type: 'theme.reorder', order: ['custom-1', second, first, ...rest.slice(0, -1)]})
      expect(slugs()).toEqual(['custom-1', second, first, ...rest.slice(0, -1)])
      expect(selectStoredState(actor.getSnapshot()).order).toEqual([
        'custom-1',
        second,
        first,
        ...rest.slice(0, -1),
      ])
    })

    it('ignores slugs that are not listed, and keeps removed themes in line', () => {
      const actor = startWithCustom({removed: ['dew'], order: ['dew', 'custom-1']})

      actor.send({type: 'theme.reorder', order: ['verdant', 'unknown', 'dew', 'custom-1']})
      expect(selectStoredState(actor.getSnapshot()).order).toEqual(['verdant', 'custom-1', 'dew'])

      actor.send({type: 'theme.restore', slug: 'dew'})
      expect(
        resolveThemes(actor.getSnapshot().context, baseOptions)
          .themes.slice(0, 3)
          .map((theme) => theme.slug),
      ).toEqual(['verdant', 'custom-1', 'dew'])
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
        order: [],
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
