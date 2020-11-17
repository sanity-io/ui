import React from 'react'

export function useForwardedRef<T>(ref: React.ForwardedRef<T>): React.MutableRefObject<T | null> {
  const innerRef = React.useRef<T | null>(null)
  React.useEffect(() => {
    if (!ref) return
    if (typeof ref === 'function') {
      ref(innerRef.current)
    } else {
      ref.current = innerRef.current
    }
  })

  return innerRef
}
