import type {PluginCreator, Rule} from 'postcss'
import postcss from 'postcss'
import type {ContainerWithChildren} from 'postcss/lib/container'

export const BREAKPOINTS = ['360px', '600px', '900px', '1200px', '1800px', '2400px'] as const

const DYNAMIC_VARS = [
  'var(--flex-basis)',
  'var(--flex-grow)',
  'var(--flex-shrink)',
  'var(--grid-auto-columns)',
  'var(--grid-auto-rows)',
  'var(--grid-column)',
  'var(--grid-column-end)',
  'var(--grid-column-start)',
  'var(--grid-row)',
  'var(--grid-row-end)',
  'var(--grid-row-start)',
  'var(--grid-template-columns)',
  'var(--grid-template-rows)',
  'var(--height)',
  'var(--max-height)',
  'var(--min-height)',
  'var(--width)',
  'var(--max-width)',
  'var(--min-width)',
]

const cache = new WeakMap()

function getClone(rule: Rule, suffix: string) {
  const clone = rule.clone()

  clone.selector = `${clone.selector}${suffix}`
  clone.raws.before = `\n${'  '}`
  clone.raws.after = `\n${'  '}`

  clone.walkDecls((decl) => {
    if (DYNAMIC_VARS.includes(decl.value)) {
      decl.value = decl.value.replace(')', `${suffix})`)
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
