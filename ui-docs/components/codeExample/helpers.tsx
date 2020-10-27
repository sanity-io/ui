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

export function renderCode(code: string, scope: Record<string, any>) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = (window as any).Babel.transform(`<>${code}</>`, {presets: ['env', 'react']})
    return {type: 'success', node: scopeEval(result.code, scope)}
  } catch (error) {
    return {type: 'error', error}
  }
}

const hasProp = {}.hasOwnProperty
const slice = [].slice

function scopeEval(source: string, scope: Record<string, any>) {
  const keys = []
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
  return Function.apply(
    null,
    slice.call(keys).concat([`return eval(${JSON.stringify(source)})`])
  ).apply(scope['this'], values)
}
