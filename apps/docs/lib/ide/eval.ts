export interface EvalComponentSuccessResult {
  type: 'success'
  node: React.ReactNode
}

export interface EvalComponentErrorResult {
  type: 'error'
  error: Error
}

export type EvalComponentResult = EvalComponentSuccessResult | EvalComponentErrorResult

export function evalComponent(opts: {
  hookCode: string
  jsxCode: string
  scope: Record<string, any>
}): EvalComponentResult {
  const code = [
    `function EvalComponent() {`,
    `  ${opts.hookCode || ''}`,
    `  return <>${opts.jsxCode}</>`,
    `}\n`,
    `function main() {`,
    `  try {`,
    `    return {type: 'success', node: <EvalComponent />}`,
    `  } catch (error) {`,
    `    return {type: 'error', error: error}`,
    `  }`,
    `}\n`,
    `main()`,
  ].join('\n')

  try {
    const babelResult = (window as any).Babel.transform(code, {
      presets: ['env', 'react'],
    })

    return scopeEval(babelResult.code, opts.scope)
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
