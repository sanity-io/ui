/**
 * The item itself, or the link of an item with an `href` (whose item element has `role="none"`)
 */
export function _getItemFocusTarget(el: HTMLElement): HTMLElement | null {
  if (el.getAttribute('role') !== 'none') return el

  return el.firstChild instanceof HTMLElement ? el.firstChild : null
}

/**
 * Returns whether focus moved, which it does not for an item that cannot take focus, e.g. because
 * it is in a collapsed group
 */
export function _focusItemElement(el: HTMLElement): boolean {
  // Inside a shadow root, the document's `activeElement` is the shadow host
  const root: Node & Partial<DocumentOrShadowRoot> = el.getRootNode()
  const activeElement = root.activeElement

  _getItemFocusTarget(el)?.focus()

  return root.activeElement !== activeElement
}

/**
 * Focuses the first item after `from` (`step` 1) or before it (`step` -1) that takes focus, or,
 * without `from`, the first or last one
 */
export function _focusNextItemElement(
  treeElement: HTMLElement,
  from: HTMLElement | null,
  step: 1 | -1,
): boolean {
  const itemElements = Array.from(treeElement.querySelectorAll<HTMLElement>('[data-ui="TreeItem"]'))
  let idx = step === 1 ? -1 : itemElements.length

  if (from) idx = itemElements.indexOf(from)

  for (let i = idx + step; i >= 0 && i < itemElements.length; i += step) {
    if (_focusItemElement(itemElements[i])) return true
  }

  return false
}
