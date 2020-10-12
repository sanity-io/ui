import {isHTMLElement} from './element'

export const focusState = {
  IgnoreUtilFocusChanges: false,
}

export function isFocusable(element: HTMLElement) {
  if (
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)
  ) {
    return true
  }

  if ((element as any).disabled) {
    return false
  }

  switch (element.nodeName) {
    case 'A':
      return !!(element as any).href && (element as any).rel != 'ignore'

    case 'INPUT':
      return (element as any).type != 'hidden' && (element as any).type != 'file'

    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true

    default:
      return false
  }
}

export function attemptFocus(element: HTMLElement) {
  if (!isFocusable(element)) {
    return false
  }

  focusState.IgnoreUtilFocusChanges = true

  try {
    element.focus()
  } catch (_) {
    // ignore
  }

  focusState.IgnoreUtilFocusChanges = false

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
