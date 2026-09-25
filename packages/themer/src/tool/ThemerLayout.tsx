import {Card, Flex, ThemeProvider, useMediaIndex} from '@sanity/ui'
import {type RootTheme, type ThemeColorSchemeKey} from '@sanity/ui/theme'
import {useActor, useSelector} from '@xstate/react'
import {
  addTransitionType,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  ViewTransition,
  type ViewTransitionClass,
} from 'react'
import {type LayoutProps, useColorSchemeValue} from 'sanity'
import {createGlobalStyle} from 'styled-components'

import {buildTheme} from '../theme/buildTheme'
import {BuildThemeOptions} from '../theme/options'
import {ThemerContext, ThemerContextValue, ThemerView} from './context'
import {selectStoredState, ThemerInput, themerMachine, ThemerSnapshot} from './machine'
import {ResizableSidebar} from './ResizableSidebar'
import {readStoredState, writeStoredState} from './storage'
import {resolveThemes, ThemerState} from './themes'

/**
 * Below this media index the Studio collapses its navbar into a drawer, and
 * the themer follows suit: the sidebar covers the Studio instead of standing
 * next to it, and the split preview stacks instead of sitting side by side.
 */
const MOBILE_MEDIA_INDEX = 1

/**
 * The transition type of toggling the split preview. The Studio updates in
 * transitions of its own all the time; only this one animates its layout.
 */
const SPLIT_TRANSITION = 'themer-split'

/** The Studio the user was looking at cross-fades between its two widths */
const resizeClass: ViewTransitionClass = {
  [SPLIT_TRANSITION]: 'themer-split-resize',
  default: 'none',
}

/**
 * How the split preview animates, through React's view transitions: the split
 * copy slides in from off screen — a transform, nothing fades — and out the
 * same way; the Studio the user was looking at cross-fades between its two
 * widths, its old and new snapshots stretched to the group's box so it keeps
 * its height. Everything shares one duration and easing, so the edge the copy
 * slides in on and the edge the Studio gives way with stay together. The
 * sidebar, a group of its own (`ResizableSidebar` names it), does not animate
 * at all: its new snapshot simply shows, stacked above the Studio copies
 * where it covers the Studio — groups of elements that only exist in the new
 * state (the arriving copy) would otherwise be stacked last, over it.
 */
const SplitTransitionStyle = createGlobalStyle`
  ::view-transition-group(themer-sidebar) {
    z-index: 1;
  }

  ::view-transition-group(themer-sidebar),
  ::view-transition-image-pair(themer-sidebar),
  ::view-transition-old(themer-sidebar),
  ::view-transition-new(themer-sidebar) {
    animation: none;
  }

  ::view-transition-group(.themer-split-resize),
  ::view-transition-old(.themer-split-resize),
  ::view-transition-new(.themer-split-resize),
  ::view-transition-new(.themer-split-slide-in),
  ::view-transition-old(.themer-split-slide-out),
  ::view-transition-new(.themer-split-drop-in),
  ::view-transition-old(.themer-split-drop-out) {
    animation-duration: 320ms;
    animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-group(.themer-split-resize),
    ::view-transition-old(.themer-split-resize),
    ::view-transition-new(.themer-split-resize),
    ::view-transition-new(.themer-split-slide-in),
    ::view-transition-old(.themer-split-slide-out),
    ::view-transition-new(.themer-split-drop-in),
    ::view-transition-old(.themer-split-drop-out) {
      animation: none;
    }
  }

  ::view-transition-old(.themer-split-resize),
  ::view-transition-new(.themer-split-resize) {
    inline-size: 100%;
    block-size: 100%;
    object-fit: fill;
  }

  ::view-transition-new(.themer-split-slide-in) {
    animation-name: themer-split-slide-in;
  }

  ::view-transition-old(.themer-split-slide-out) {
    animation-name: themer-split-slide-out;
  }

  ::view-transition-new(.themer-split-drop-in) {
    animation-name: themer-split-drop-in;
  }

  ::view-transition-old(.themer-split-drop-out) {
    animation-name: themer-split-drop-out;
  }

  @keyframes themer-split-slide-in {
    from {
      transform: translateX(-100%);
    }
  }

  @keyframes themer-split-slide-out {
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes themer-split-drop-in {
    from {
      transform: translateY(-100%);
    }
  }

  @keyframes themer-split-drop-out {
    to {
      transform: translateY(-100%);
    }
  }
`

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
 * The Studio next to the sidebar always follows the appearance setting
 * (light/dark/system) and the picked theme like any other theme would. The
 * split preview adds a second copy in the opposite scheme on the far side —
 * or on top, on small screens — through React's view transitions (React
 * 19.3), styled by `SplitTransitionStyle`.
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

  // The machine publishes its state synchronously, which React does not
  // animate: the split copy mounts from state of its own, set in a transition
  // of the split's type, which is what lets the view transition run — after
  // the sidebar's own changes (the toggle's pressed state) have committed, so
  // nothing in the sidebar changes while it does
  const [shownSplit, setShownSplit] = useState(split)
  useEffect(() => {
    if (shownSplit === split) return
    startTransition(() => {
      addTransitionType(SPLIT_TRANSITION)
      setShownSplit(split)
    })
  }, [shownSplit, split])

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
    () => ({baseOptions, themes, removed, active, images, view, open, split, mobile, send}),
    [active, baseOptions, images, mobile, open, removed, send, split, themes, view],
  )

  const studio = layoutProps.renderDefault(layoutProps)

  return (
    <ThemerContext.Provider value={context}>
      <SplitTransitionStyle />
      <Flex
        direction={mobile ? 'column' : 'row'}
        height="fill"
        sizing="border"
        style={{position: 'relative'}}
      >
        {/* The opposite scheme comes first — on the far side of the sidebar,
            or on top on small screens — so the Studio the user was looking at
            stays where it is, mounted, in its own scheme */}
        {shownSplit && (
          <ViewTransition
            key="opposite"
            enter={mobile ? 'themer-split-drop-in' : 'themer-split-slide-in'}
            exit={mobile ? 'themer-split-drop-out' : 'themer-split-slide-out'}
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
        )}
        <ViewTransition key="primary" update={resizeClass}>
          <StudioPreview theme={theme}>{studio}</StudioPreview>
        </ViewTransition>

        {open && (
          <ThemeProvider theme={theme ?? undefined}>
            <ResizableSidebar overlay={mobile} />
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
  borderBottom?: boolean
  borderRight?: boolean
  children: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme: RootTheme | null
}) {
  const {borderBottom, borderRight, children, scheme, theme} = props

  return (
    <ThemeProvider scheme={scheme} theme={theme ?? undefined}>
      <Card
        borderBottom={borderBottom}
        borderRight={borderRight}
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
