import {ThemeProvider} from '@sanity/ui'
import {useActor, useSelector} from '@xstate/react'
import {useEffect, useMemo, useState} from 'react'
import {type LayoutProps} from 'sanity'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {selectStoredState, ThemerInput, themerMachine, ThemerSnapshot} from './machine'
import {readStoredState, writeStoredState} from './storage'
import {resolveThemes, ThemerState} from './themes'

function sameStoredState(a: ThemerState, b: ThemerState): boolean {
  return a.active === b.active && a.custom === b.custom && a.removed === b.removed
}

function selectView(snapshot: ThemerSnapshot): ThemerView {
  const {editing} = snapshot.context

  if (snapshot.matches({flow: 'edit'}) && editing) {
    return {name: 'edit', slug: editing.slug, focusTitle: editing.focusTitle}
  }

  if (snapshot.matches({flow: 'removed'})) {
    return {name: 'removed'}
  }

  return {name: 'list'}
}

function sameView(a: ThemerView, b: ThemerView): boolean {
  if (a.name !== b.name) return false

  return (
    a.name !== 'edit' || b.name !== 'edit' || (a.slug === b.slug && a.focusTitle === b.focusTitle)
  )
}

/**
 * Wraps the whole Studio so that the theme picked in the themer sidebar
 * applies everywhere while the user browses around, and runs the themer
 * machine that the navbar toggle and the sidebar share: the user's themes,
 * which one is applied, and which flow the sidebar is in.
 *
 * The theme provider inherits the color scheme from the Studio, so the
 * preview follows the appearance setting (light/dark/system) like any other
 * theme.
 *
 * @internal
 */
export function ThemerLayout(props: LayoutProps & {baseOptions: BuildThemeOptions}) {
  const {baseOptions, ...layoutProps} = props
  const [input] = useState<ThemerInput>(() => ({baseOptions, stored: readStoredState()}))
  const [snapshot, send, actorRef] = useActor(themerMachine, {input})
  const stored = useSelector(actorRef, selectStoredState, sameStoredState)
  const view = useSelector(actorRef, selectView, sameView)
  const open = snapshot.matches({sidebar: 'open'})

  useEffect(() => writeStoredState(stored), [stored])

  const {themes, removed, active} = useMemo(
    () => resolveThemes(stored, baseOptions),
    [stored, baseOptions],
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

  const context = useMemo<ThemerContextValue>(
    () => ({baseOptions, themes, removed, active, view, open, send}),
    [active, baseOptions, open, removed, send, themes, view],
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
