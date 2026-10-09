import {TreeState} from './types'

const ITEM_SELECTOR = '[data-ui="TreeItem"]'

/**
 * The tree's item elements in document order. Read from the DOM when a key is pressed, so items
 * that mounted, unmounted or moved since the last render are navigated as they are now.
 */
export function _getItemElements(treeElement: HTMLElement): HTMLElement[] {
  return Array.from(treeElement.querySelectorAll<HTMLElement>(ITEM_SELECTOR))
}

/**
 * The item element that contains `element`: the element itself, or an ancestor such as the item
 * whose link (`href`) or content received focus.
 */
export function _closestItemElement(element: Element): HTMLElement | null {
  return element.closest<HTMLElement>(ITEM_SELECTOR)
}

/**
 * The key an item registered under (`data-tree-key`), or `null` for an element that is not an
 * item.
 */
export function _getItemKey(element: HTMLElement): string | null {
  return element.getAttribute('data-tree-key')
}

/**
 * Whether the item with `itemKey` is inside expanded ancestors only, i.e. whether its group is
 * shown. Derived from `state` alone, so it can be used during render.
 */
export function _isItemKeyVisible(state: TreeState, itemKey: string): boolean {
  const segments = itemKey.split('/')

  segments.pop()

  const p: string[] = []

  for (const segment of segments) {
    p.push(segment)

    if (!state[p.join('/')]?.expanded) return false
  }

  return true
}

function _isItemVisible(state: TreeState, element: HTMLElement): boolean {
  const itemKey = _getItemKey(element)

  return itemKey !== null && _isItemKeyVisible(state, itemKey)
}

/**
 * The items a key can move focus to, in the order they should be tried: `ArrowDown` continues
 * after the focused item, `ArrowUp` before it (nearest first), and from the tree element `Home` /
 * `ArrowDown` start at the first item and `End` / `ArrowUp` at the last one.
 */
export function _getItemCandidates(
  state: TreeState,
  itemElements: HTMLElement[],
  direction: 'next' | 'prev',
  focusedElement?: HTMLElement,
): HTMLElement[] {
  const candidates: HTMLElement[] = []
  const idx = focusedElement ? itemElements.indexOf(focusedElement) : -1

  if (focusedElement && idx === -1) return candidates

  if (direction === 'next') {
    for (let i = idx + 1; i < itemElements.length; i += 1) {
      if (_isItemVisible(state, itemElements[i])) candidates.push(itemElements[i])
    }
  } else {
    for (let i = (idx === -1 ? itemElements.length : idx) - 1; i >= 0; i -= 1) {
      if (_isItemVisible(state, itemElements[i])) candidates.push(itemElements[i])
    }
  }

  return candidates
}

/**
 * The focused element as seen from `element`: inside a shadow root `document.activeElement` is the
 * shadow host, the root node knows the element itself.
 */
export function _getActiveElement(element: Element): Element | null {
  const root = element.getRootNode()

  return root instanceof Document || root instanceof ShadowRoot ? root.activeElement : null
}

/**
 * The node of an item that takes focus: the item itself, or the link of an item with an `href`.
 */
function _getItemFocusTarget(el: HTMLElement): HTMLElement | null {
  if (el.getAttribute('role') === 'treeitem') return el

  if (el.getAttribute('role') === 'none') {
    const firstChild = el.firstChild

    if (firstChild instanceof HTMLElement) return firstChild
  }

  return null
}

/**
 * Whether an item can be made the tab stop without being focused first: it has a node that takes
 * focus, and nothing between that node and the tree element hides it — except the tree's own
 * collapsed groups, which are state the render-time derivation accounts for (`_isItemKeyVisible`),
 * so that the item becomes the tab stop when its ancestor expands. Anything else (`hidden`,
 * `display: none`, `visibility: hidden` from the consumer) would put the tab stop on a node that
 * sequential focus navigation skips and take the tree out of the tab order. Runs at effect time,
 * for an item mounted as `selected`.
 */
export function _isItemFocusable(el: HTMLElement, treeElement: HTMLElement | null): boolean {
  const target = _getItemFocusTarget(el)

  if (!target) return false

  const view = target.ownerDocument.defaultView

  if (!view) return true

  for (
    let node: HTMLElement | null = target;
    node && node !== treeElement;
    node = node.parentElement
  ) {
    if (node.getAttribute('data-ui') === 'TreeGroup') continue

    const {display, visibility} = view.getComputedStyle(node)

    if (display === 'none' || visibility === 'hidden') return false
  }

  return true
}

/**
 * Focuses the node of an item that takes focus and returns it.
 */
function _focusItemElement(el: HTMLElement): HTMLElement | null {
  const target = _getItemFocusTarget(el)

  target?.focus()

  return target
}

/**
 * Focuses the first of `candidates` that takes focus and returns it. `focus()` fails silently on
 * an item that cannot take focus right now (hidden by the consumer, a `linkAs` without a focusable
 * element), so each candidate is tried in turn and checked against the active element — exactly,
 * since focus that stays on a descendant item does not make its ancestor the focused one.
 */
export function _focusFirstItemElement(candidates: HTMLElement[]): HTMLElement | null {
  for (const el of candidates) {
    const target = _focusItemElement(el)

    if (target && _getActiveElement(el) === target) return el
  }

  return null
}
