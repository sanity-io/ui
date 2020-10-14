export function isHTMLElement(node: Node): node is HTMLElement {
  return node.nodeType === Node.ELEMENT_NODE
}

export function isHTMLAnchorElement(element: HTMLElement): element is HTMLAnchorElement {
  return element.nodeName === 'A'
}

export function isHTMLInputElement(element: HTMLElement): element is HTMLInputElement {
  return element.nodeName === 'INPUT'
}

export function isHTMLButtonElement(element: HTMLElement): element is HTMLButtonElement {
  return element.nodeName === 'BUTTON'
}

export function isHTMLSelectElement(element: HTMLElement): element is HTMLSelectElement {
  return element.nodeName === 'SELECT'
}

export function isHTMLTextAreaElement(element: HTMLElement): element is HTMLTextAreaElement {
  return element.nodeName === 'TEXTAREA'
}
