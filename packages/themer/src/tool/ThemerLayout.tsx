import {Card, Flex, ThemeProvider, useMediaIndex} from '@sanity/ui'
import {type RootTheme, type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useActor, useSelector} from '@xstate/react'
import {
  Activity,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
  ViewTransition,
} from 'react'
import {type LayoutProps, useColorSchemeValue} from 'sanity'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {selectStoredState, ThemerInput, themerMachine, ThemerSnapshot} from './machine'
import {ResizableSidebar} from './ResizableSidebar'
import {readStoredState} from './storage'
import {resolveThemes, ThemerState} from './themes'
import {useStudioNavbarHeight} from './useStudioNavbarHeight'

import {
  layout,
  panelTransitionClasses,
  splitTransitionClasses,
  studioScheme,
} from './ThemerLayout.css'

/**
 * Below this media index the Studio collapses its navbar into a drawer, and
 * the themer follows suit: the sidebar covers the Studio instead of standing
 * next to it, and the split preview stacks instead of sitting side by side.
 */
const MOBILE_MEDIA_INDEX = 1

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
 * The machine says what shows and when the layout is in motion (its `panel`,
 * `split` and `moving` tags); the layout defers what shows, which puts the
 * panel's and the copy's mounts in a transition — what lets React animate
 * them — and picks the view transition classes from the tags.
 *
 * @internal
 */
export function ThemerLayout(props: LayoutProps & {baseOptions: BuildThemeOptions}) {
  const {baseOptions, ...layoutProps} = props
  const [input] = useState<ThemerInput>(() => ({baseOptions, stored: readStoredState()}))
  const [snapshot, send, actorRef] = useActor(themerMachine, {input})
  const stored = useSelector(actorRef, selectStoredState, sameStoredState)
  const view = useSelector(actorRef, selectView, sameView)
  const open = snapshot.hasTag('panel')
  const split = snapshot.hasTag('split')
  const moving = snapshot.hasTag('moving')
  const {images} = snapshot.context
  const mobile = useMediaIndex() <= MOBILE_MEDIA_INDEX
  const studioRef = useRef<HTMLDivElement | null>(null)
  const navbarHeight = useStudioNavbarHeight(studioRef)

  // The machine publishes synchronously, which React does not animate. What
  // shows is deferred: that renders the panel's and the copy's mounts in a
  // transition — once the sidebar's own changes (the toggle's pressed state)
  // have committed, so nothing in the sidebar changes while it runs
  const shownOpen = useDeferredValue(open)
  const shownSplit = useDeferredValue(split)

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
      split,
      mobile,
      navbarHeight,
      send,
    }),
    [active, baseOptions, images, mobile, navbarHeight, open, removed, send, split, themes, view],
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
        {shownOpen && (
          <Activity mode={shownSplit ? 'visible' : 'hidden'}>
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
        {/* The Studio gives way and takes room while the machine says the
            layout is moving — the Studio updates in transitions of its own
            all the time, and none of those may animate it. Once its transition
            is under way the machine hears of it, and the Studio is its own
            again before the next commit */}
        <ViewTransition
          key="primary"
          onUpdate={() => send({type: 'layout.transitioned'})}
          update={moving ? splitTransitionClasses.resize : 'none'}
        >
          <StudioPreview ref={studioRef} theme={theme}>
            {studio}
          </StudioPreview>
        </ViewTransition>

        {/* The sidebar is small and cheap: it stays mounted, hidden while
            closed, keeping its state and ready to show */}
        <Activity mode={shownOpen ? 'visible' : 'hidden'}>
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
