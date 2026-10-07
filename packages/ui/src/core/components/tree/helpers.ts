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
 * An item can take focus when every ancestor item is expanded.
 */
function _isItemVisible(state: TreeState, element: HTMLElement): boolean {
  const itemKey = element.getAttribute('data-tree-key')

  if (!itemKey) return false

  const segments = itemKey.split('/')

  segments.pop()

  const p: string[] = []

  for (const segment of segments) {
    p.push(segment)

    if (!state[p.join('/')]?.expanded) return false
  }

  return true
}

export function _findPrevItemElement(
  state: TreeState,
  itemElements: HTMLElement[],
  focusedElement: HTMLElement,
): HTMLElement | null {
  const idx = itemElements.indexOf(focusedElement)

  for (let i = idx - 1; i >= 0; i -= 1) {
    if (_isItemVisible(state, itemElements[i])) return itemElements[i]
  }

  return null
}

export function _findNextItemElement(
  state: TreeState,
  itemElements: HTMLElement[],
  focusedElement: HTMLElement,
): HTMLElement | null {
  const idx = itemElements.indexOf(focusedElement)

  if (idx === -1) return null

  for (let i = idx + 1; i < itemElements.length; i += 1) {
    if (_isItemVisible(state, itemElements[i])) return itemElements[i]
  }

  return null
}

export function _findLastItemElement(
  state: TreeState,
  itemElements: HTMLElement[],
): HTMLElement | null {
  for (let i = itemElements.length - 1; i >= 0; i -= 1) {
    if (_isItemVisible(state, itemElements[i])) return itemElements[i]
  }

  return null
}

export function _focusItemElement(el: HTMLElement): void {
  if (el.getAttribute('role') === 'treeitem') {
    el.focus()
  }

  if (el.getAttribute('role') === 'none') {
    const firstChild = el.firstChild

    if (firstChild && firstChild instanceof HTMLElement) {
      firstChild.focus()
    }
  }
}
