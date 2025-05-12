import {scopeClassName} from '../scopeClassName'
import {type Rules} from '../types'
import {compileMediaQueryRule, compileRule} from './compileRule'
import {CompileRulesContext} from './types'

/** @public */
export function compileRules(rules: Rules): string {
  let css = ''

  const context: CompileRulesContext = {
    keyframes: {},
    media: {},
  }

  for (const [className, props] of Object.entries(rules)) {
    const ruleCss = compileRule(
      `.${scopeClassName(className)}`.replace(/:/g, '\\:'),
      props,
      context,
    )

    css += ruleCss ? `${ruleCss}\n` : ''
  }

  for (const [name, value] of Object.entries(context.keyframes)) {
    let keyframesCss = `@keyframes ${name} {\n`

    for (const [key, props] of Object.entries(value)) {
      keyframesCss += `  ${key}`
      keyframesCss += compileRule('', props, context).replace(/\n/g, '\n    ') + '\n'
    }

    keyframesCss += `\n}\n`

    css += keyframesCss
  }

  for (const [query, queryRules] of Object.entries(context.media)) {
    css += compileMediaQueryRule(query, queryRules) + '\n'
  }

  return css.replace(/\n{2,}/g, '\n').trimStart()
}
