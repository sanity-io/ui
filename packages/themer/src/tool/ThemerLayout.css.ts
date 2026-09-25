import {
  createViewTransition,
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from '@vanilla-extract/css'

import {sidebarTransition} from './ResizableSidebar.css'

/**
 * The view transition classes of the split preview — what React puts in
 * `view-transition-class`, which the pseudo-element rules below select on.
 * Scoped identifiers, so nothing else on the page can mean the same.
 */
export const splitTransitionClasses = {
  /** The Studio the user was looking at cross-fades between its two widths */
  resize: createViewTransition('splitResize'),
  /** The Studio and the panel cross-fade to another theme, in place */
  crossfade: createViewTransition('themeCrossfade'),
  /** The split copy slides in from the side, or out to it */
  slideIn: createViewTransition('splitSlideIn'),
  slideOut: createViewTransition('splitSlideOut'),
  /** The split copy drops in from the top, or out to it, where the copies stack */
  dropIn: createViewTransition('splitDropIn'),
  dropOut: createViewTransition('splitDropOut'),
}

/** The view transition classes of the panel, which slides in from its edge and out to it */
export const panelTransitionClasses = {
  slideIn: createViewTransition('panelSlideIn'),
  slideOut: createViewTransition('panelSlideOut'),
}

/**
 * The transition type of the layout's motions — what `ThemerLayout` adds to
 * every transition it starts, and React passes on to the view transition.
 * `:active-view-transition-type()` tells the layout's transitions from any
 * other on the page while they run.
 */
export const layoutTransitionType = 'sanity-themer'

/** How long the layout's motions take, and how they ease — every group they move shares these */
const motion = {
  animationDuration: '320ms',
  animationTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
}

/** The layout's `Flex` positions the sidebar overlay on small screens */
export const layout = style({
  position: 'relative',
})

/** A copy of the Studio in a color scheme of its own, for `color-scheme` */
export const studioScheme = styleVariants({
  light: {colorScheme: 'light'},
  dark: {colorScheme: 'dark'},
})

/**
 * The split copy of the Studio. It renders the Studio a second time — and
 * with it, a second time, every `view-transition-name` the Studio gives its
 * elements (an avatar named so it moves as one piece, say). Two rendered
 * elements of one name make the browser skip the whole view transition
 * ("Unexpected duplicate view-transition-name"): the copy would neither
 * slide in nor out, and while the split shows the Studio's own transitions
 * would not animate either. So nothing inside the copy keeps its name — it
 * is the Studio the user was looking at that keeps them, and the copy moves
 * as one piece anyway: its snapshot slides, nothing inside it goes its own
 * way. `!important`, as names are set inline as often as from a stylesheet
 * (React names its own boundaries that way).
 */
export const studioCopy = style({})

globalStyle(`${studioCopy} *`, {
  viewTransitionName: 'none !important',
})

const slideIn = keyframes({from: {transform: 'translateX(-100%)'}})
const slideOut = keyframes({to: {transform: 'translateX(-100%)'}})
const dropIn = keyframes({from: {transform: 'translateY(-100%)'}})
const dropOut = keyframes({to: {transform: 'translateY(-100%)'}})
const slideInFromEnd = keyframes({from: {transform: 'translateX(100%)'}})
const slideOutToEnd = keyframes({to: {transform: 'translateX(100%)'}})

/**
 * How the panel and the split preview animate, through React's view
 * transitions: the panel slides in from its edge and the split copy from the
 * far one — a transform, nothing fades — and out the same way; the Studio the
 * user was looking at cross-fades between its two widths, its old and new
 * snapshots stretched to the group's box so it keeps its height. Everything
 * shares one duration and easing, so the edge a panel slides in on and the
 * edge the Studio gives way with stay together.
 */
globalStyle(
  [
    `::view-transition-group(.${splitTransitionClasses.resize})`,
    `::view-transition-old(.${splitTransitionClasses.resize})`,
    `::view-transition-new(.${splitTransitionClasses.resize})`,
    `::view-transition-new(.${splitTransitionClasses.slideIn})`,
    `::view-transition-old(.${splitTransitionClasses.slideOut})`,
    `::view-transition-new(.${splitTransitionClasses.dropIn})`,
    `::view-transition-old(.${splitTransitionClasses.dropOut})`,
    `::view-transition-new(.${panelTransitionClasses.slideIn})`,
    `::view-transition-old(.${panelTransitionClasses.slideOut})`,
    `::view-transition-old(.${splitTransitionClasses.crossfade})`,
    `::view-transition-new(.${splitTransitionClasses.crossfade})`,
  ].join(', '),
  motion,
)

/**
 * Whatever else on the page has a `view-transition-name` of its own — an
 * avatar the Studio names so it moves as one piece instead of stretching
 * along with the navbar's snapshot, say — takes part in the layout's
 * transitions too, as a group of its own that the browser moves and
 * cross-fades from where it was to where it ends up: at its default quarter
 * of a second and `ease`, out of step with the navbar it sits in. While one of
 * the layout's transitions runs, every group keeps the layout's time instead.
 * Only then: the Studio's own transitions are none of the layout's business
 * and keep their own — and the layout's own groups, which the rules above set
 * to the same time, are none the different.
 */
globalStyle(
  [
    `:root:active-view-transition-type(${layoutTransitionType})::view-transition-group(*)`,
    `:root:active-view-transition-type(${layoutTransitionType})::view-transition-old(*)`,
    `:root:active-view-transition-type(${layoutTransitionType})::view-transition-new(*)`,
  ].join(', '),
  motion,
)

globalStyle(
  [
    `::view-transition-old(.${splitTransitionClasses.resize})`,
    `::view-transition-new(.${splitTransitionClasses.resize})`,
  ].join(', '),
  {
    inlineSize: '100%',
    blockSize: '100%',
    objectFit: 'fill',
  },
)

globalStyle(`::view-transition-new(.${splitTransitionClasses.slideIn})`, {animationName: slideIn})
globalStyle(`::view-transition-old(.${splitTransitionClasses.slideOut})`, {
  animationName: slideOut,
})
globalStyle(`::view-transition-new(.${splitTransitionClasses.dropIn})`, {animationName: dropIn})
globalStyle(`::view-transition-old(.${splitTransitionClasses.dropOut})`, {animationName: dropOut})
globalStyle(`::view-transition-new(.${panelTransitionClasses.slideIn})`, {
  animationName: slideInFromEnd,
})
globalStyle(`::view-transition-old(.${panelTransitionClasses.slideOut})`, {
  animationName: slideOutToEnd,
})

/**
 * While the split preview toggles, the sidebar — a group of its own, which
 * `ResizableSidebar` names — does not animate at all: its new snapshot simply
 * shows, stacked above the Studio copies where it covers the Studio (groups of
 * elements that only exist in the new state, the arriving copy, would
 * otherwise be stacked last, over it). While the panel itself opens or closes,
 * or cross-fades to another theme, React names it instead, and the rules
 * above apply.
 *
 */
globalStyle(`::view-transition-group(${sidebarTransition})`, {zIndex: 1})
globalStyle(
  [
    `::view-transition-group(${sidebarTransition})`,
    `::view-transition-image-pair(${sidebarTransition})`,
    `::view-transition-old(${sidebarTransition})`,
    `::view-transition-new(${sidebarTransition})`,
  ].join(', '),
  {animation: 'none'},
)

/**
 * Someone who prefers reduced motion sees no motion here: the layout does not
 * start these transitions in the first place (see `ThemerLayout`), and should
 * one run anyway — the preference changed after the layout read it, the
 * Studio ran one of its own over these groups — none of their animations does
 * anything, nor those of any other group the layout's transition moves: the
 * new state simply shows.
 */
globalStyle(
  ['group', 'image-pair', 'old', 'new']
    .flatMap((part) => {
      const groups = [
        ...Object.values(splitTransitionClasses).map((className) => `.${className}`),
        ...Object.values(panelTransitionClasses).map((className) => `.${className}`),
        sidebarTransition,
      ]
      const selectors = groups.map((group) => `::view-transition-${part}(${group})`)

      selectors.push(
        `:root:active-view-transition-type(${layoutTransitionType})::view-transition-${part}(*)`,
      )

      return selectors
    })
    .join(', '),
  {
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
)
