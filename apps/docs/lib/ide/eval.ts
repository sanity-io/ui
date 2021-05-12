export interface JSXEvalSuccessResult {
  type: 'success'
  node: React.ReactNode
}

export interface JSXEvalErrorResult {
  type: 'error'
  error: Error
}

export type JSXEvalResult = JSXEvalSuccessResult | JSXEvalErrorResult

export interface HookEvalSuccessResult {
  type: 'success'
  fn: () => Record<string, unknown>
}

export interface HookEvalErrorResult {
  type: 'error'
  error: Error
}

export type HookEvalResult = HookEvalSuccessResult | HookEvalErrorResult

export function evalHook(code: string, scope: Record<string, any>): HookEvalResult {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (window as any).Babel.transform(`() => {${code}}`, {
      presets: ['env', 'react'],
    })

    return {type: 'success', fn: scopeEval(result.code, scope)}
  } catch (error) {
    return {type: 'error', error}
  }
}

export function evalJSX(code: string, scope: Record<string, any>): JSXEvalResult {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (window as any).Babel.transform(`<>${code}</>`, {presets: ['env', 'react']})

    return {type: 'success', node: scopeEval(result.code, scope)}
  } catch (error) {
    return {type: 'error', error}
  }
}

const hasProp = {}.hasOwnProperty

function scopeEval(source: string, scope: Record<string, any>) {
  const keys: string[] = []
  const values = []

  let value: any

  for (const key in scope) {
    if (!hasProp.call(scope, key)) continue

    value = scope[key]

    if (key === 'this') {
      continue
    }

    keys.push(key)
    values.push(value)
  }

  // eslint-disable-next-line prefer-spread
  return Function.apply(null, keys.concat([`return eval(${JSON.stringify(source)})`])).apply(
    scope['this'],
    values
  )
}
