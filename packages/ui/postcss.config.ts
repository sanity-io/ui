import path from 'node:path'

import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import type {AcceptedPlugin, Rule} from 'postcss'
import postcssImport from 'postcss-import'
import prefixer from 'postcss-prefix-selector'
import selectorParser from 'postcss-selector-parser'

import breakpoints from './postcss-breakpoints'

const version = 'alpha17'
const componentClassPattern = /^sui-[A-Z]/

function suffixSelectorClasses(selector: string, suffix: string) {
  return selectorParser((selectors) => {
    selectors.walkClasses((classNode) => {
      if (componentClassPattern.test(classNode.value) && !classNode.value.endsWith(`-${suffix}`)) {
        classNode.value = `${classNode.value}-${suffix}`
      }
    })
  }).processSync(selector)
}

const config = {
  plugins: [
    postcssImport({
      path: [path.relative(process.cwd(), '../')],
    }),
    prefixer({
      prefix: version,
      transform(
        prefix: string,
        selector: string,
        _prefixedSelector: string,
        _filePath: string,
        rule: Rule,
      ) {
        const filePath = rule.source?.input?.file ?? _filePath

        if (filePath.match(/ui\/src\/components/)) {
          return suffixSelectorClasses(selector, prefix)
        }

        return selector
      },
    } as Parameters<typeof prefixer>[0]),
    breakpoints,
    autoprefixer,
    ...(process.env['NODE_ENV'] === 'production'
      ? [
          cssnano({
            preset: 'default',
          }),
        ]
      : []),
  ] as AcceptedPlugin[],
}

export default config
