import {Card, Flex, ThemeProvider} from '@sanity/ui'
import {type RootTheme, type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useActor, useSelector} from '@xstate/react'
import {useEffect, useMemo, useRef, useState} from 'react'
import {type LayoutProps, useColorSchemeValue} from 'sanity'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {selectStoredState, ThemerInput, themerMachine, ThemerSnapshot} from './machine'
import {ResizableSidebar} from './ResizableSidebar'
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
 * applies everywhere while the user browses around, runs the themer machine
 * that the navbar toggle and the sidebar share — the user's themes, which one
 * is applied, which flow the sidebar is in and how the Studio is previewed —
 * and renders the sidebar next to the Studio. The sidebar sits at the
 * `layout` level rather than in `activeToolLayout` because the split preview
 * renders the Studio twice, and the sidebar must not come along.
 *
 * The single preview inherits the color scheme from the Studio, so it follows
 * the appearance setting (light/dark/system) like any other theme.
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
  const split = snapshot.matches({preview: 'split'})
  const {images} = snapshot.context

  useEffect(() => writeStoredState(stored), [stored])

  // The images live in memory as object URLs — release the ones no theme
  // refers to anymore, and all of them on the way out
  const previousImages = useRef(images)

  useEffect(() => {
    const current = new Set(Object.values(images))

    for (const url of Object.values(previousImages.current)) {
      if (!current.has(url)) URL.revokeObjectURL(url)
    }

    previousImages.current = images
  }, [images])

  useEffect(
    () => () => {
      for (const url of Object.values(previousImages.current)) URL.revokeObjectURL(url)
    },
    [],
  )

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

  // The Studio paints the body with its configured theme from above this
  // layout, and Safari tints its chrome from the body — so the applied theme
  // has to reach the body too, in the scheme the Studio is showing
  const scheme = useColorSchemeValue()

  useEffect(() => {
    const background = theme?.v2?.color[scheme].default.bg

    if (background === undefined) return undefined

    const {style} = document.body
    const previous = style.backgroundColor

    style.backgroundColor = background

    return () => {
      style.backgroundColor = previous
    }
  }, [scheme, theme])

  const context = useMemo<ThemerContextValue>(
    () => ({baseOptions, themes, removed, active, images, view, open, split, send}),
    [active, baseOptions, images, open, removed, send, split, themes, view],
  )

  const studio = layoutProps.renderDefault(layoutProps)

  return (
    <ThemerContext.Provider value={context}>
      <Flex height="fill" sizing="border">
        {/* The first copy keeps its place when the preview splits, so the Studio
            in it stays mounted and only changes scheme */}
        <StudioPreview scheme={split ? 'light' : undefined} theme={theme}>
          {studio}
        </StudioPreview>
        {split && (
          <StudioPreview borderLeft scheme="dark" theme={theme}>
            {studio}
          </StudioPreview>
        )}

        {open && (
          <ThemeProvider theme={theme ?? undefined}>
            <ResizableSidebar />
          </ThemeProvider>
        )}
      </Flex>
    </ThemerContext.Provider>
  )
}

/**
 * One copy of the Studio, in the given color scheme — or, without one, in the
 * scheme the Studio is showing. The configured theme (`null`) goes through
 * the provider too, inheriting the Studio's, so picking a theme swaps it
 * instead of remounting the Studio under a new provider.
 *
 * The two copies of the split preview share the router, the document store
 * and every other provider above the layout — only the scheme differs — so
 * they stay in sync while navigating. The `color-scheme` of a forced scheme
 * keeps native form controls and scrollbars in step with it.
 */
function StudioPreview(props: {
  borderLeft?: boolean
  children: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme | null
}) {
  const {borderLeft, children, scheme, theme} = props

  return (
    <ThemeProvider scheme={scheme} theme={theme ?? undefined}>
      <Card
        borderLeft={borderLeft}
        flex={1}
        height="fill"
        overflow="hidden"
        style={scheme ? {colorScheme: scheme} : undefined}
      >
        {children}
      </Card>
    </ThemeProvider>
  )
}
