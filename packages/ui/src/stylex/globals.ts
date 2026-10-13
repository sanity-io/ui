/**
 * Descendant and ancestor selectors vanilla-extract expressed with `globalStyle`
 * or a parent selector. StyleX has no descendant combinator, so each group is
 * its own content-hashed class. The class is added next to the StyleX classes
 * in the `.css.ts` module; the rules are appended to `styles.css`.
 *
 * The hash covers the rule body, so a later v4 build that changes the rule
 * cannot reuse the class name (SAPP-4639).
 */

/** 64-bit FNV-1a. The `c` prefix stays out of StyleX's `x` namespace and v5's `sui-` prefix. */
export function hashCss(value: string): string {
  let hash = 0xcbf29ce484222325n

  for (let i = 0; i < value.length; i++) {
    hash ^= BigInt(value.charCodeAt(i))
    hash = BigInt.asUintN(64, hash * 0x100000001b3n)
  }

  return `c${hash.toString(36)}`
}

export interface GlobalClass {
  className: string
  css: string
}

function rule(body: string): GlobalClass {
  const className = hashCss(body)

  return {className, css: body.replaceAll('&', `.${className}`)}
}

const zoomFrames = 'from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}'
const zoomName = hashCss(zoomFrames)

export const buttonLabel = rule(`
& > span {
  display: block;
  flex: 1;
  min-width: 0;
  border-radius: inherit;
}
`)

export const autocompleteList = rule(`
& > ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
`)

export const tabListChild = rule(`
& > div {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  box-sizing: border-box;
}
`)

export const treeItemChildren = rule(`
&[role="none"] > [role="treeitem"] {
  outline: none;
  cursor: default;
  border-radius: 3px;
  background-color: var(--card-bg-color);
  color: var(--treeitem-fg-color);
}
&[role="none"] > [role="treeitem"]:focus {
  position: relative;
}
&[role="treeitem"] > div {
  cursor: default;
  border-radius: 3px;
  background-color: var(--card-bg-color);
  color: var(--treeitem-fg-color);
}
&[role="treeitem"]:focus > div {
  position: relative;
}
`)

export const avatarArrowPlacement = rule(`
[data-arrow-position="inside"] > & {
  transform: rotate(-90deg) translate3d(0, 6px, 0);
  opacity: 0;
}
[data-arrow-position="top"] > & {
  opacity: 1;
  transform: rotate(0deg);
}
[data-arrow-position="bottom"] > & {
  opacity: 1;
  transform: rotate(-180deg);
}
& > svg {
  width: 11px;
  height: 7px;
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-6px);
}
& > svg:not([hidden]) {
  display: block;
}
`)

export const avatarStackChild = rule(`
& > div {
  vertical-align: top;
}
& > div:not([hidden]) {
  display: inline-block;
}
`)

export const avatarEditing = rule(`
[data-status="editing"] & {
  stroke-dasharray: 2 4;
  stroke-linecap: round;
}
`)

export const arrowPlacement = rule(`
:empty + & { display: none; }
[data-placement^="top"] > & { bottom: calc(-1 * var(--sui-arrow-size)); }
[data-placement^="right"] > & { left: calc(-1 * var(--sui-arrow-size)); }
[data-placement^="left"] > & { right: calc(-1 * var(--sui-arrow-size)); }
[data-placement^="bottom"] > & { top: calc(-1 * var(--sui-arrow-size)); }
& > svg {
  display: block;
  line-height: 0;
  transform-origin: calc(var(--sui-arrow-size) / 2) calc(var(--sui-arrow-size) / 2);
}
[data-placement^="top"] > & > svg { transform: rotate(0); }
[data-placement^="right"] > & > svg { transform: rotate(90deg); }
[data-placement^="left"] > & > svg { transform: rotate(-90deg); }
[data-placement^="bottom"] > & > svg { transform: rotate(180deg); }
`)

export const dialogCardIn = rule(`
@keyframes ${zoomName} { ${zoomFrames} }
& > [data-ui="DialogCard"] {
  animation: ${zoomName} 200ms ease-out;
}
`)

// `.class[class]` is specificity (0, 2, 0), the same boost vanilla-extract's
// `&&` gave the loading-bar color so it beats the card background.
export const toastProgress = rule(`
&[class] {
  background-color: var(--toast-loading-bar-bg);
}
`)

const groups = [
  buttonLabel,
  autocompleteList,
  tabListChild,
  treeItemChildren,
  avatarArrowPlacement,
  avatarStackChild,
  avatarEditing,
  arrowPlacement,
  dialogCardIn,
  toastProgress,
]

// `/*!` survives lightningcss, so a second pass can see that the sheet is already appended.
export const GLOBAL_MARK = '/*! sui-static-globals */'

export const globalSheet = `${GLOBAL_MARK}\n${groups.map((group) => group.css).join('\n')}\n`

export function withGlobal(
  styleClass: string | null | undefined,
  globalClass: GlobalClass,
): string {
  return `${styleClass ?? ''} ${globalClass.className}`.trim()
}
