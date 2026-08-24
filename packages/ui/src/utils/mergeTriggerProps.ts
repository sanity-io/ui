function isReactEventHandler(key: string, value: unknown): value is (e: never) => void {
  return /^on[A-Z]/.test(key) && typeof value === 'function'
}

function chainEventHandlers<E>(
  ...handlers: (((e: E) => void) | undefined)[]
): ((e: E) => void) | undefined {
  const defined = handlers.filter(Boolean) as ((e: E) => void)[]

  if (defined.length === 0) {
    return undefined
  }

  if (defined.length === 1) {
    return defined[0]
  }

  return (e: E) => {
    for (const handler of defined) {
      handler(e)
    }
  }
}

export function mergeTriggerProps(
  childProps: Record<string, unknown>,
  forwardedProps?: Record<string, unknown>,
  ownProps?: Record<string, unknown>,
) {
  const result: Record<string, unknown> = {}

  for (const source of [forwardedProps, ownProps]) {
    if (!source) {
      continue
    }

    for (const [key, value] of Object.entries(source)) {
      if (key === 'style') {
        continue
      }

      if (isReactEventHandler(key, value)) {
        result[key] = chainEventHandlers(result[key] as (e: never) => void, value)
        continue
      }

      if (value !== undefined) {
        result[key] = value
      }
    }
  }

  result['style'] = {
    ...(childProps['style'] as object),
    ...(forwardedProps?.['style'] as object),
    ...(ownProps?.['style'] as object),
  }

  for (const [key, value] of Object.entries(childProps)) {
    if (isReactEventHandler(key, value)) {
      result[key] = chainEventHandlers(result[key] as (e: never) => void, value)
    }
  }

  return result
}
