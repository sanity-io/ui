if (
  typeof HTMLButtonElement !== 'undefined' &&
  !('interestForElement' in HTMLButtonElement.prototype)
) {
  void import('interestfor')
}
