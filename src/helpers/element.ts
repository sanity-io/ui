export function isHTMLElement(node: unknown): node is HTMLElement {
  return node instanceof Node && node.nodeType === Node.ELEMENT_NODE
}

export function isHTMLAnchorElement(element: unknown): element is HTMLAnchorElement {
  return isHTMLElement(element) && element.nodeName === 'A'
}

export function isHTMLInputElement(element: unknown): element is HTMLInputElement {
  return isHTMLElement(element) && element.nodeName === 'INPUT'
}

export function isHTMLButtonElement(element: unknown): element is HTMLButtonElement {
  return isHTMLElement(element) && element.nodeName === 'BUTTON'
}

export function isHTMLSelectElement(element: unknown): element is HTMLSelectElement {
  return isHTMLElement(element) && element.nodeName === 'SELECT'
}

export function isHTMLTextAreaElement(element: unknown): element is HTMLTextAreaElement {
  return isHTMLElement(element) && element.nodeName === 'TEXTAREA'
}
