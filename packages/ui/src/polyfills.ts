import {
  apply as applyClosedByPolyfill,
  isSupported as isClosedBySupported,
} from 'dialog-closedby-polyfill'

if (
  typeof HTMLButtonElement !== 'undefined' &&
  !('interestForElement' in HTMLButtonElement.prototype)
) {
  void import('interestfor')
}

if (typeof HTMLDialogElement !== 'undefined' && !isClosedBySupported()) {
  applyClosedByPolyfill()
}
