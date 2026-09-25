import {globalStyle, keyframes, style, styleVariants} from '@vanilla-extract/css'

import {SIDEBAR_TRANSITION_NAME} from './ResizableSidebar.css'

/**
 * The transition type of toggling the split preview. The Studio updates in
 * transitions of its own all the time; only this one animates its layout.
 */
export const SPLIT_TRANSITION = 'themer-split'

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

/**
 * How the split preview animates, through React's view transitions: the split
 * copy slides in from off screen — a transform, nothing fades — and out the
 * same way; the Studio the user was looking at cross-fades between its two
 * widths, its old and new snapshots stretched to the group's box so it keeps
 * its height. Everything shares one duration and easing, so the edge the copy
 * slides in on and the edge the Studio gives way with stay together.
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

/**
 * The sidebar, a group of its own (`ResizableSidebar` names it), does not
 * animate at all: its new snapshot simply shows, stacked above the Studio
 * copies where it covers the Studio — groups of elements that only exist in
 * the new state (the arriving copy) would otherwise be stacked last, over it.
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
