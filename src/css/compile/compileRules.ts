import {type Properties, type Rules} from '../types'
import {compileRule, compileMediaQueryRule} from './compileRule'

/** @public */
export function compileRules(rules: Rules): string {
  let css = ''

  const keyframes: Record<string, Record<string, Properties>> = {}
  const mediaQueries: Record<string, Record<string, Properties>> = {}

  for (const [className, props] of Object.entries(rules)) {
    const selectorCss = compileRule(`.${className}`.replace(/:/g, '\\:'), props)

    css += selectorCss ? `${selectorCss}\n` : ''

    if (props['@keyframes']) {
      for (const name in props['@keyframes']) {
        // if (!keyframes[name]) {
        //   keyframes[name] = {from: {}, to: {}}
        // }

        keyframes[name] = props['@keyframes'][name]
        // keyframes[name][className] = props['@keyframes'][key]
      }
    }

    if (props['@media']) {
      for (const key in props['@media']) {
        if (!mediaQueries[key]) {
          mediaQueries[key] = {}
        }

        mediaQueries[key][className] = props['@media'][key]
      }
    }
  }

  for (const [name, value] of Object.entries(keyframes)) {
    let keyframesCss = `@keyframes ${name} {\n`

    for (const [key, props] of Object.entries(value)) {
      keyframesCss += `  ${key}`
      keyframesCss += compileRule('', props).replace(/\n/g, '\n    ') + '\n'
    }

    keyframesCss += `\n}\n`

    css += keyframesCss
  }

  for (const [query, queryRules] of Object.entries(mediaQueries)) {
    css += compileMediaQueryRule(query, queryRules) + '\n'
  }

  return css.replace(/\n{2,}/g, '\n').trimStart()
}
