import {ThemeProvider} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useReducer, useState} from 'react'
import {type LayoutProps} from 'sanity'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {readStoredState, writeStoredState} from './storage'
import {
  createCustomTheme,
  duplicateTitle,
  resolveThemes,
  themerReducer,
  UNTITLED_THEME,
} from './themes'

const LIST_VIEW: ThemerView = {name: 'list'}

/**
 * Wraps the whole Studio so that the theme picked in the themer sidebar
 * applies everywhere while the user browses around, and hosts the state that
 * the navbar toggle and the sidebar share: the user's themes, which one is
 * applied, and which flow the sidebar is in.
 *
 * The theme provider inherits the color scheme from the Studio, so the
 * preview follows the appearance setting (light/dark/system) like any other
 * theme.
 *
 * @internal
 */
export function ThemerLayout(props: LayoutProps & {baseOptions: BuildThemeOptions}) {
  const {baseOptions, ...layoutProps} = props
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<ThemerView>(LIST_VIEW)
  const [state, dispatch] = useReducer(themerReducer, undefined, readStoredState)

  useEffect(() => writeStoredState(state), [state])

  const {themes, removed, active} = useMemo(
    () => resolveThemes(state, baseOptions),
    [state, baseOptions],
  )

  // The theme identity must be stable between renders: it feeds the
  // styled-components theme context for the whole Studio, and rebuilding it
  // would re-render everything. Keying on the options object keeps it stable
  // across unrelated changes, like renaming a theme.
  const activeOptions = active.source === 'config' ? null : active.options
  const theme = useMemo(
    () => (activeOptions === null ? null : buildTheme(activeOptions)),
    [activeOptions],
  )

  const pick = useCallback((slug: string) => dispatch({type: 'pick', slug}), [])

  const add = useCallback((title: string, options: BuildThemeOptions) => {
    const created = createCustomTheme(title, options)

    dispatch({type: 'add', theme: created})
    setView({name: 'edit', slug: created.slug, focusTitle: true})
  }, [])

  const addTheme = useCallback(() => add(UNTITLED_THEME, active.options), [active, add])

  const duplicateTheme = useCallback(
    (slug: string) => {
      const source = [...themes, ...removed].find((theme) => theme.slug === slug)

      if (source) add(duplicateTitle(source.title), source.options)
    },
    [add, removed, themes],
  )

  const editTheme = useCallback((slug: string) => {
    dispatch({type: 'pick', slug})
    setView({name: 'edit', slug})
  }, [])

  const updateTheme = useCallback<ThemerContextValue['updateTheme']>(
    (slug, changes) => dispatch({type: 'update', slug, ...changes}),
    [],
  )

  const removeTheme = useCallback((slug: string) => dispatch({type: 'remove', slug}), [])
  const restoreTheme = useCallback((slug: string) => dispatch({type: 'restore', slug}), [])
  const deleteTheme = useCallback((slug: string) => dispatch({type: 'delete', slug}), [])

  const context = useMemo<ThemerContextValue>(
    () => ({
      baseOptions,
      themes,
      removed,
      active,
      view,
      setView,
      open,
      setOpen,
      pick,
      addTheme,
      duplicateTheme,
      editTheme,
      updateTheme,
      removeTheme,
      restoreTheme,
      deleteTheme,
    }),
    [
      active,
      addTheme,
      baseOptions,
      deleteTheme,
      duplicateTheme,
      editTheme,
      open,
      pick,
      removeTheme,
      removed,
      restoreTheme,
      themes,
      updateTheme,
      view,
    ],
  )

  return (
    <ThemerContext.Provider value={context}>
      {theme === null ? (
        layoutProps.renderDefault(layoutProps)
      ) : (
        <ThemeProvider theme={theme}>{layoutProps.renderDefault(layoutProps)}</ThemeProvider>
      )}
    </ThemerContext.Provider>
  )
}
