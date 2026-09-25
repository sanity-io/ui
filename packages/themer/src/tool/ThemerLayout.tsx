import {Card, Flex, ThemeProvider, useMediaIndex} from '@sanity/ui'
import {type RootTheme, type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useActor, useSelector} from '@xstate/react'
import {
  Activity,
  addTransitionType,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  ViewTransition,
} from 'react'
import {type LayoutProps, useColorSchemeValue} from 'sanity'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {selectStoredState, ThemerInput, themerMachine, ThemerSnapshot} from './machine'
import {readStoredState, writeStoredState} from './storage'
import {resolveThemes, ThemerState} from './themes'
import {useStudioNavbarHeight} from './useStudioNavbarHeight'

import {
  layout,
  PANEL_TRANSITION,
  panelTransitionClasses,
  SPLIT_TRANSITION,
  splitTransitionClasses,
  studioScheme,
} from './ThemerLayout.css'

/**
 * Below this media index the Studio collapses its navbar into a drawer, and
 * the themer follows suit: the sidebar covers the Studio instead of standing
 * next to it, and the split preview stacks instead of sitting side by side.
 */
const MOBILE_MEDIA_INDEX = 1

/**
 * How long, at most, the Studio keeps its `update` class after the panel or
 * the split toggles — normally it drops it the moment its transition starts,
 * this covers a toggle that does not move it (the overlay on small screens).
 * The Studio updates in transitions of its own all the time, and none of
 * those should run a view transition over it — only these toggles do.
 */
const RESIZE_WINDOW = 500

/**
 * The sidebar — everything in it, from the theme list to the snippet dialog —
 * loads the first time it opens. There is no `Suspense` boundary around it,
 * so it must only ever render from a transition: that keeps the Studio as it
 * was while the code loads, with the navbar toggle showing the transition as
 * pending, where an urgent render would suspend up to the Studio's own
 * boundary and swap the whole Studio for its loading screen.
 */
const ResizableSidebar = lazy(() =>
  import('./ResizableSidebar').then((module) => ({default: module.ResizableSidebar})),
)

function sameStoredState(a: ThemerState, b: ThemerState): boolean {
  return (
    a.active === b.active && a.custom === b.custom && a.removed === b.removed && a.order === b.order
  )
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
 * The Studio next to the sidebar always follows the appearance setting
 * (light/dark/system) and the picked theme like any other theme would. The
 * split preview adds a second copy in the opposite scheme on the far side —
 * or on top, on small screens — through React's view transitions (React
 * 19.3), styled in `ThemerLayout.css.ts`.
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
  const mobile = useMediaIndex() <= MOBILE_MEDIA_INDEX
  const studioRef = useRef<HTMLDivElement | null>(null)
  const navbarHeight = useStudioNavbarHeight(studioRef)

  // The machine publishes its state synchronously, which React does not
  // animate: the panel and the split copy show from state of their own, set
  // in a transition typed after what changed, which is what lets the view
  // transition run — after the sidebar's own changes (the toggle's pressed
  // state) have committed, so nothing in the sidebar changes while it does.
  // Closing the sidebar ends the split, so both leave in one transition.
  const [shown, setShown] = useState({open, split})
  const [isPending, startTransition] = useTransition()
  // The sidebar mounts the first time it opens, which is when its code loads,
  // and stays mounted from then on
  const [panelMounted, setPanelMounted] = useState(false)
  // The Studio's `update` class goes by state rather than by the transition's
  // types: a commit that also carries work for hidden `Activity` content (as
  // after revealing the split copy) drops the types, and the Studio would
  // snap to its new width instead of cross-fading. The class is only needed
  // as the transition starts, and goes away as soon as it has
  const [resizing, setResizing] = useState(false)
  const stopResizing = () => setResizing(false)
  useEffect(() => {
    if (shown.open === open && shown.split === split) return
    startTransition(() => {
      if (shown.open !== open) addTransitionType(PANEL_TRANSITION)
      if (shown.split !== split) addTransitionType(SPLIT_TRANSITION)
      setShown({open, split})
      if (open) setPanelMounted(true)
      setResizing(true)
    })
  }, [open, shown, split])

  useEffect(() => {
    if (!resizing) return undefined

    const timer = setTimeout(() => setResizing(false), RESIZE_WINDOW)

    return () => clearTimeout(timer)
  }, [resizing, shown])

  // Only the first opening has code to load. Every later toggle commits as
  // soon as it renders, and its pending state would only flash the spinner on
  // the navbar toggle — into the view transition's snapshot of the Studio too
  const loading = isPending && !panelMounted

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
  const oppositeScheme: ThemeColorSchemeKey = scheme === 'dark' ? 'light' : 'dark'

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
    () => ({
      baseOptions,
      themes,
      removed,
      active,
      images,
      view,
      open,
      loading,
      split,
      mobile,
      navbarHeight,
      send,
    }),
    [
      active,
      baseOptions,
      images,
      loading,
      mobile,
      navbarHeight,
      open,
      removed,
      send,
      split,
      themes,
      view,
    ],
  )

  const studio = layoutProps.renderDefault(layoutProps)

  return (
    <ThemerContext.Provider value={context}>
      <Flex className={layout} direction={mobile ? 'column' : 'row'} height="fill" sizing="border">
        {/* The opposite scheme comes first — on the far side of the sidebar,
            or on top on small screens — so the Studio the user was looking at
            stays where it is, mounted, in its own scheme. A whole second
            Studio is too costly to keep around (its styled-components alone
            insert CSS as they render), so it only exists while the sidebar is
            open — hidden until the split shows, warmed up for the transition */}
        {shown.open && (
          <Activity mode={shown.split ? 'visible' : 'hidden'}>
            <ViewTransition
              key="opposite"
              enter={mobile ? splitTransitionClasses.dropIn : splitTransitionClasses.slideIn}
              exit={mobile ? splitTransitionClasses.dropOut : splitTransitionClasses.slideOut}
              update="none"
            >
              <StudioPreview
                borderBottom={mobile}
                borderRight={!mobile}
                scheme={oppositeScheme}
                theme={theme}
              >
                {studio}
              </StudioPreview>
            </ViewTransition>
          </Activity>
        )}
        <ViewTransition
          key="primary"
          onUpdate={stopResizing}
          update={resizing ? splitTransitionClasses.resize : 'none'}
        >
          <StudioPreview ref={studioRef} theme={theme}>
            {studio}
          </StudioPreview>
        </ViewTransition>

        {/* The sidebar is small and cheap: once it has opened it stays
            mounted, hidden while closed, keeping its state and ready to show.
            Until then it is left out — hidden, it would be pre-rendered, and
            its code loaded, as soon as the Studio renders */}
        {panelMounted && (
          <Activity mode={shown.open ? 'visible' : 'hidden'}>
            <ViewTransition
              key="panel"
              enter={panelTransitionClasses.slideIn}
              exit={panelTransitionClasses.slideOut}
              update="none"
            >
              <ThemeProvider theme={theme ?? undefined}>
                <ResizableSidebar overlay={mobile} />
              </ThemeProvider>
            </ViewTransition>
          </Activity>
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
  borderBottom?: boolean
  borderRight?: boolean
  children: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
  scheme?: ThemeColorSchemeKey
  theme: RootTheme | null
}) {
  const {borderBottom, borderRight, children, ref, scheme, theme} = props

  return (
    <ThemeProvider scheme={scheme} theme={theme ?? undefined}>
      <Card
        borderBottom={borderBottom}
        borderRight={borderRight}
        className={scheme ? studioScheme[scheme] : undefined}
        flex={1}
        height="fill"
        overflow="hidden"
        ref={ref}
      >
        {children}
      </Card>
    </ThemeProvider>
  )
}
