/**
 * @internal
 */
export function ConditionalWrapper({
  children,
  condition,
  wrapper,
}: {
  children: React.ReactNode
  condition: boolean
  wrapper: (children: React.ReactNode) => React.ReactNode
}): React.ReactNode {
  if (!condition) {
    return children
  }

  return wrapper(children)
}
