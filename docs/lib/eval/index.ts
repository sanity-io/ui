export interface EvalSuccessResult {
  type: 'success'
  node: React.ReactNode
}

export interface EvalErrorResult {
  type: 'error'
  error: Error
}

export type EvalResult = EvalSuccessResult | EvalErrorResult

export function ready(opts?: {timeout?: number}) {
  const timeout = opts?.timeout || 10000

  return new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()

      return
    }

    const startTime = Date.now()

    const tick = () => {
      const duration = Date.now() - startTime

      if (duration > timeout) {
        reject(new Error('eval.ready: timeout'))

        return
      }

      if ((window as any).Babel) {
        resolve()

        return
      }

      setTimeout(tick, 100)
    }

    setTimeout(tick, 100)
  })
}

export function renderHooks(code: string, scope: Record<string, any>) {
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

export function renderCode(code: string, scope: Record<string, any>): EvalResult {
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
