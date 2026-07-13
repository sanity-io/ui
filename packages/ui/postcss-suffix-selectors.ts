import type {Rule} from 'postcss'
import selectorParser from 'postcss-selector-parser'

const componentPattern = /^sui-[A-Z]/

export function suffixSelectors(
  prefix: string,
  selector: string,
  _prefixedSelector: string,
  filePath: string,
  rule: Rule,
) {
  const resolvedPath = rule.source?.input?.file ?? filePath

  if (!resolvedPath.match(/ui\/src\/components/)) {
    return selector
  }

  return selectorParser((selectors) => {
    selectors.walkClasses((classNode) => {
      if (componentPattern.test(classNode.value) && !classNode.value.endsWith(`-${prefix}`)) {
        classNode.value = `${classNode.value}-${prefix}`
      }
    })
  }).processSync(selector)
}
