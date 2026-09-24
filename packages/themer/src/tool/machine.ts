import {assign, not, setup, SnapshotFrom} from 'xstate'

import {BuildThemeOptions} from '../theme/options'
import {ImagePalette} from './imagePalette'
import {
  CONFIG_SLUG,
  createCustomTheme,
  duplicateTitle,
  resolveThemes,
  ThemerState,
  UNTITLED_THEME,
} from './themes'

/** What the themer machine starts from @internal */
export interface ThemerInput {
  /** The theme options the Studio's configured theme was generated from */
  baseOptions: BuildThemeOptions
  /** The persisted state of an earlier session */
  stored: ThemerState
}

/** @internal */
export interface ThemerMachineContext extends ThemerState {
  baseOptions: BuildThemeOptions
  /** The theme open in the editor, while the `flow` is `edit` */
  editing: {
    slug: string
    /** Whether the title input should take focus, for themes that were just created */
    focusTitle: boolean
  } | null
  /**
   * Object URLs of the images that themes took their palette from, by theme
   * slug — kept for the session only, so the image can be shown right after
   * it was picked
   */
  images: Record<string, string>
}

/** @internal */
export type ThemerEvent =
  | {type: 'sidebar.toggle'}
  | {type: 'sidebar.close'}
  /** Applies a theme to the whole Studio */
  | {type: 'theme.pick'; slug: string}
  /**
   * Adds a theme and opens it in the editor — based on the applied theme, or
   * on the given title, options and image palette (e.g. from an image)
   */
  | {
      type: 'theme.add'
      title?: string
      options?: BuildThemeOptions
      palette?: ImagePalette
      imageUrl?: string
    }
  /** Adds a copy of a theme and opens it in the editor */
  | {type: 'theme.duplicate'; slug: string}
  /** Opens one of the user's own themes in the editor */
  | {type: 'theme.edit'; slug: string}
  | {
      type: 'theme.update'
      slug: string
      title?: string
      options?: BuildThemeOptions
      palette?: ImagePalette
      imageUrl?: string
    }
  /** Takes a theme out of the list — it can be restored until it is deleted */
  | {type: 'theme.remove'; slug: string}
  /** Puts a removed theme back in the list */
  | {type: 'theme.restore'; slug: string}
  /** Deletes one of the user's own themes for good */
  | {type: 'theme.delete'; slug: string}
  /** Back to picking a theme */
  | {type: 'flow.list'}
  /** On to restoring removed themes */
  | {type: 'flow.removed'}

function themesOf(context: ThemerMachineContext) {
  return resolveThemes(context, context.baseOptions)
}

/**
 * The state of the themer tool: two parallel regions, whether the `sidebar`
 * is open and which `flow` it is in — picking a theme from the `list`,
 * `edit`ing one of the user's own themes, or restoring `removed` ones. The
 * context carries the persisted state (the applied theme, the user's themes
 * and what was removed) alongside what the flows need.
 *
 * Theme operations are handled in every flow, and the flows leave on their
 * own when they lose their subject: the editor when its theme is removed or
 * deleted, and the removed view when its last theme is restored or deleted.
 *
 * @internal
 */
export const themerMachine = setup({
  // XState reads `types` for their types only — the values are never used
  types: {
    // oxlint-disable-next-line no-unsafe-type-assertion -- type-level placeholder
    context: {} as ThemerMachineContext,
    // oxlint-disable-next-line no-unsafe-type-assertion -- type-level placeholder
    events: {} as ThemerEvent,
    // oxlint-disable-next-line no-unsafe-type-assertion -- type-level placeholder
    input: {} as ThemerInput,
  },
  guards: {
    isCustomTheme: ({context}, params: {slug: string}) =>
      themesOf(context).themes.some(
        (theme) => theme.slug === params.slug && theme.source === 'custom',
      ),
    isEditingListedTheme: ({context}) =>
      context.editing !== null &&
      themesOf(context).themes.some(
        (theme) => theme.slug === context.editing?.slug && theme.source === 'custom',
      ),
    hasRemovedThemes: ({context}) => themesOf(context).removed.length > 0,
  },
  actions: {
    pick: assign((_, params: {slug: string}) => ({
      active: params.slug === CONFIG_SLUG ? null : params.slug,
    })),
    add: assign(
      (
        {context},
        params: {
          title?: string
          options?: BuildThemeOptions
          palette?: ImagePalette
          imageUrl?: string
        },
      ) => {
        const theme = createCustomTheme(
          params.title ?? UNTITLED_THEME,
          params.options ?? themesOf(context).active.options,
          params.palette,
        )

        return {
          active: theme.slug,
          custom: [...context.custom, theme],
          // A theme named after its image needs no renaming right away
          editing: {slug: theme.slug, focusTitle: params.title === undefined},
          images: params.imageUrl
            ? {...context.images, [theme.slug]: params.imageUrl}
            : context.images,
        }
      },
    ),
    duplicate: assign(({context}, params: {slug: string}) => {
      const {themes, removed} = themesOf(context)
      const source = [...themes, ...removed].find((theme) => theme.slug === params.slug)

      if (!source) return {}

      const theme = createCustomTheme(duplicateTitle(source.title), source.options, source.palette)

      return {
        active: theme.slug,
        custom: [...context.custom, theme],
        editing: {slug: theme.slug, focusTitle: true},
      }
    }),
    startEditing: assign((_, params: {slug: string}) => ({
      active: params.slug,
      editing: {slug: params.slug, focusTitle: false},
    })),
    stopEditing: assign({editing: null}),
    update: assign(
      (
        {context},
        params: {
          slug: string
          title?: string
          options?: BuildThemeOptions
          palette?: ImagePalette
          imageUrl?: string
        },
      ) => ({
        custom: context.custom.map((theme) => {
          if (theme.slug !== params.slug) return theme

          // Keep the options identity when only the title changes, so the
          // applied theme is not rebuilt on every keystroke
          return {
            ...theme,
            title: params.title ?? theme.title,
            options: params.options ?? theme.options,
            ...(params.palette ? {palette: params.palette} : {}),
          }
        }),
        images:
          params.imageUrl && context.custom.some((theme) => theme.slug === params.slug)
            ? {...context.images, [params.slug]: params.imageUrl}
            : context.images,
      }),
    ),
    remove: assign(({context}, params: {slug: string}) => {
      if (params.slug === CONFIG_SLUG || context.removed.includes(params.slug)) return {}

      return {
        active: context.active === params.slug ? null : context.active,
        removed: [...context.removed, params.slug],
      }
    }),
    restore: assign(({context}, params: {slug: string}) => ({
      removed: context.removed.filter((slug) => slug !== params.slug),
    })),
    delete: assign(({context}, params: {slug: string}) => {
      if (!context.custom.some((theme) => theme.slug === params.slug)) return {}

      const {[params.slug]: _deleted, ...images} = context.images

      return {
        active: context.active === params.slug ? null : context.active,
        custom: context.custom.filter((theme) => theme.slug !== params.slug),
        removed: context.removed.filter((slug) => slug !== params.slug),
        images,
      }
    }),
  },
}).createMachine({
  id: 'themer',
  context: ({input}) => ({
    ...input.stored,
    baseOptions: input.baseOptions,
    editing: null,
    images: {},
  }),
  type: 'parallel',
  states: {
    sidebar: {
      initial: 'closed',
      states: {
        closed: {
          on: {'sidebar.toggle': 'open'},
        },
        open: {
          on: {'sidebar.toggle': 'closed', 'sidebar.close': 'closed'},
        },
      },
    },
    flow: {
      initial: 'list',
      on: {
        'theme.pick': {
          actions: {type: 'pick', params: ({event}) => ({slug: event.slug})},
        },
        'theme.add': {
          target: '.edit',
          actions: {
            type: 'add',
            params: ({event}) => ({
              title: event.title,
              options: event.options,
              palette: event.palette,
              imageUrl: event.imageUrl,
            }),
          },
        },
        'theme.duplicate': {
          target: '.edit',
          actions: {type: 'duplicate', params: ({event}) => ({slug: event.slug})},
        },
        'theme.edit': {
          target: '.edit',
          guard: {type: 'isCustomTheme', params: ({event}) => ({slug: event.slug})},
          actions: {type: 'startEditing', params: ({event}) => ({slug: event.slug})},
        },
        'theme.update': {
          actions: {
            type: 'update',
            params: ({event}) => ({
              slug: event.slug,
              title: event.title,
              options: event.options,
              palette: event.palette,
              imageUrl: event.imageUrl,
            }),
          },
        },
        'theme.remove': {
          actions: {type: 'remove', params: ({event}) => ({slug: event.slug})},
        },
        'theme.restore': {
          actions: {type: 'restore', params: ({event}) => ({slug: event.slug})},
        },
        'theme.delete': {
          actions: {type: 'delete', params: ({event}) => ({slug: event.slug})},
        },
        'flow.list': '.list',
        'flow.removed': {
          target: '.removed',
          guard: 'hasRemovedThemes',
        },
      },
      states: {
        list: {},
        edit: {
          exit: 'stopEditing',
          // The theme being edited can go away — removed from the editor, or
          // duplicated from a theme that does not exist — and then there is
          // nothing left to edit
          always: {guard: not('isEditingListedTheme'), target: 'list'},
        },
        removed: {
          always: {guard: not('hasRemovedThemes'), target: 'list'},
        },
      },
    },
  },
})

/** @internal */
export type ThemerSnapshot = SnapshotFrom<typeof themerMachine>

/** The part of the machine context that is persisted between sessions @internal */
export function selectStoredState(snapshot: ThemerSnapshot): ThemerState {
  const {active, custom, removed} = snapshot.context

  return {active, custom, removed}
}
