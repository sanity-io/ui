import {
  isHTMLElement,
  isHTMLAnchorElement,
  isHTMLInputElement,
  isHTMLButtonElement,
  isHTMLSelectElement,
  isHTMLTextAreaElement,
} from './element'

// export const globalFocusState = {
//   IgnoreUtilFocusChanges: false,
// }

export function isFocusable(element: HTMLElement) {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }

  if (isHTMLAnchorElement(element)) {
    return Boolean(element.href) && element.rel !== 'ignore'
  }

  if (isHTMLInputElement(element)) {
    return element.type !== 'hidden' && element.type !== 'file' && !element.disabled
  }

  if (
    isHTMLButtonElement(element) ||
    isHTMLSelectElement(element) ||
    isHTMLTextAreaElement(element)
  ) {
    return !element.disabled
  }

  return false
}

export function attemptFocus(element: HTMLElement) {
  if (!isFocusable(element)) {
    return false
  }

  // globalFocusState.IgnoreUtilFocusChanges = true

  try {
    element.focus()
  } catch (_) {
    // ignore
  }

  // globalFocusState.IgnoreUtilFocusChanges = false

  return document.activeElement === element
}

export function focusFirstDescendant(element: HTMLElement) {
  for (let i = 0; i < element.childNodes.length; i++) {
    const child = element.childNodes[i]

    if (isHTMLElement(child) && (attemptFocus(child) || focusFirstDescendant(child))) {
      return true
    }
  }

  return false
}

export function focusLastDescendant(element: HTMLElement) {
  for (let i = element.childNodes.length - 1; i >= 0; i--) {
    const child = element.childNodes[i]

    if (isHTMLElement(child) && (attemptFocus(child) || focusLastDescendant(child))) {
      return true
    }
  }

  return false
}
