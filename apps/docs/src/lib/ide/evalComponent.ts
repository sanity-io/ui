import {Babel} from './loadBabel'

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
  babel: Babel
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
    const babelResult = opts.babel.transform(code, {
      presets: [
        'env',
        // Force the classic JSX runtime so the output uses `React.createElement`
        // (which is provided via `scope`) instead of injecting an
        // `import {jsx} from "react/jsx-runtime"` statement. As of
        // @babel/standalone v8 the automatic runtime is the default, and the
        // injected ESM `import` throws a SyntaxError when evaluated in the
        // non-module `Function`/`eval` context used by `scopeEval`.
        ['react', {runtime: 'classic'}],
      ],
    })

    if (babelResult.code === null) {
      throw new Error('Babel returned no code')
    }

    return scopeEval(babelResult.code, opts.scope)
  } catch (error) {
    if (error instanceof Error) {
      return {type: 'error', error}
    }

    return {type: 'error', error: new Error(String(error))}
  }
}

function scopeEval(source: string, scope: Record<string, any>) {
  const keys: string[] = []
  const values = []

  for (const key of Object.keys(scope)) {
    if (key === 'this') {
      continue
    }

    keys.push(key)
    values.push(scope[key])
  }

  return Function.apply(null, keys.concat([`return eval(${JSON.stringify(source)})`])).apply(
    scope['this'],
    values,
  )
}
