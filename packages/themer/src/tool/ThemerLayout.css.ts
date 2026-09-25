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
    `::view-transition-old(.${splitTransitionClasses.crossfade})`,
    `::view-transition-new(.${splitTransitionClasses.crossfade})`,
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
 * or cross-fades to another theme, React names it instead, and the rules
 * above apply.
 *
 * Someone who prefers reduced motion gets none of these transitions: the
 * layout does not start them (see `ThemerLayout`), so there is nothing here to
 * switch off.
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
