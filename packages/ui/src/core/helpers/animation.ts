/**
 * @internal
 */
export function _raf(fn: () => void): () => void {
  const frameId = requestAnimationFrame(fn)

  return () => {
    cancelAnimationFrame(frameId)
  }
}

/**
 * @internal
 */
export function _raf2(fn: () => void): () => void {
  let innerDispose: (() => void) | undefined = undefined

  const dispose = _raf(() => {
    innerDispose = _raf(fn)
  })

  return () => {
    innerDispose?.()
    dispose()
  }
}
