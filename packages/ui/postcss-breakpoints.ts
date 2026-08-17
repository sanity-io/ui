import type {PluginCreator, Rule} from 'postcss'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import type {ContainerWithChildren} from 'postcss/lib/container'

export const BREAKPOINTS = ['360px', '600px', '900px', '1200px', '1800px'] as const

const VAR_REGEX = /^var\(\s*(--[\w-]+)\s*\)$/

const cache = new WeakMap()

function getIsDynamicCssPath(fromPath: string | undefined) {
  if (!fromPath) {
    return false
  }

  return fromPath.replace(/\\/g, '/').includes('/classes/dynamic/')
}

function suffixSelector(selector: string, suffix: string) {
  return selectorParser((selectors) => {
    selectors.walkClasses((classNode) => {
      classNode.value = `${classNode.value}${suffix}`
    })
  }).processSync(selector)
}

function getClone(rule: Rule, suffix: string) {
  const clone = rule.clone()

  clone.selector = suffixSelector(clone.selector, suffix)
  clone.raws.before = `\n${'  '}`
  clone.raws.after = `\n${'  '}`

  clone.walkDecls((decl) => {
    const fromPath = decl.source?.input?.from || rule.source?.input?.from

    if (getIsDynamicCssPath(fromPath) && VAR_REGEX.test(decl.value)) {
      decl.value = decl.value.replace(VAR_REGEX, (_, name: string) => `var(${name}${suffix})`)
    }

    decl.raws.before = `\n${'    '}`
  })

  return clone
}

const creator: PluginCreator<never> = () => {
  return {
    postcssPlugin: 'postcss-breakpoints',
    Rule(rule) {
      if ((rule.parent as ContainerWithChildren & {name: string})?.name === 'breakpoints') {
        const atRule = rule.parent

        if (!atRule) {
          return
        }

        if (!cache.has(atRule)) {
          const mediaQueries = BREAKPOINTS.reduce<Record<number, {name: string; params: string}>>(
            (obj, breakpoint, i) => {
              obj[i + 1] = new postcss.AtRule({
                name: 'media',
                params: `(min-width: ${breakpoint})`,
              })

              return obj
            },
            {},
          )

          cache.set(atRule, mediaQueries)

          Object.values(mediaQueries)
            .reverse()
            .forEach((query) => {
              atRule.after(query)
            })
        }

        atRule.before(rule)
        rule.selector = rule.selector.replace(/\n\s\s/g, '\n')
        rule.cleanRaws()

        BREAKPOINTS.forEach((_breakpoint, i) => {
          const clone = getClone(rule, `-bp-${i + 1}`)
          cache.get(atRule)[i + 1].append(clone)
        })

        if (atRule.nodes.length === 0) {
          atRule.remove()
          cache.delete(atRule)
        }
      }
    },
  }
}

creator.postcss = true

export default creator
