import {ReactNode} from 'react'

/**
 * @internal
 * @deprecated this component will be removed in the next major release
 */
export function ConditionalWrapper({
  children,
  condition,
  wrapper,
}: {
  children: ReactNode
  condition: boolean
  wrapper: (children: ReactNode) => ReactNode
}): ReactNode {
  if (!condition) {
    return children
  }

  return wrapper(children)
}

ConditionalWrapper.displayName = 'ConditionalWrapper'
