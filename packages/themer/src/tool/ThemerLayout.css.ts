import {globalStyle, keyframes, style, styleVariants} from '@vanilla-extract/css'

import {SIDEBAR_TRANSITION_NAME} from './ResizableSidebar.css'

/**
 * The transition types of toggling the split preview and of opening or
 * closing the panel. The Studio updates in transitions of its own all the
 * time; only these two animate its layout.
 */
export const SPLIT_TRANSITION = 'themer-split'
export const PANEL_TRANSITION = 'themer-panel'

/**
 * The view transition classes of the split preview — the strings React puts
 * in `view-transition-class`, which the pseudo-element rules below select on
 */
export const splitTransitionClasses = {
  /** The Studio the user was looking at cross-fades between its two widths */
  resize: 'themer-split-resize',
  /** The split copy slides in from the side, or out to it */
  slideIn: 'themer-split-slide-in',
  slideOut: 'themer-split-slide-out',
  /** The split copy drops in from the top, or out to it, where the copies stack */
  dropIn: 'themer-split-drop-in',
  dropOut: 'themer-split-drop-out',
}

/** The view transition classes of the panel, which slides in from its edge and out to it */
export const panelTransitionClasses = {
  slideIn: 'themer-panel-slide-in',
  slideOut: 'themer-panel-slide-out',
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
  ].join(', '),
  {
    animationDuration: '320ms',
    animationTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)',
  },
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
 * React names it instead, and the rules above slide it.
 */
globalStyle(`::view-transition-group(${SIDEBAR_TRANSITION_NAME})`, {zIndex: 1})
globalStyle(
  [
    `::view-transition-group(${SIDEBAR_TRANSITION_NAME})`,
    `::view-transition-image-pair(${SIDEBAR_TRANSITION_NAME})`,
    `::view-transition-old(${SIDEBAR_TRANSITION_NAME})`,
    `::view-transition-new(${SIDEBAR_TRANSITION_NAME})`,
  ].join(', '),
  {animation: 'none'},
)

/**
 * With reduced motion, nothing in these transitions animates — not the panel
 * or the copies, not the root's cross-fade — so the new layout simply shows:
 * the transition is over as soon as it starts. Scoped through the transition
 * types, so other view transitions on the page keep their own reduced-motion
 * behavior.
 */
globalStyle(
  [SPLIT_TRANSITION, PANEL_TRANSITION]
    .flatMap((type) =>
      ['group', 'image-pair', 'old', 'new'].map(
        (part) => `:root:active-view-transition-type(${type})::view-transition-${part}(*)`,
      ),
    )
    .join(', '),
  {
    '@media': {
      '(prefers-reduced-motion: reduce)': {
        animation: 'none',
      },
    },
  },
)
