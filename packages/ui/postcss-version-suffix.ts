import type {Rule} from 'postcss'
import selectorParser from 'postcss-selector-parser'

const componentClassPattern = /^sui-[A-Z]/

export function versionSuffix(
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
      if (componentClassPattern.test(classNode.value) && !classNode.value.endsWith(`-${prefix}`)) {
        classNode.value = `${classNode.value}-${prefix}`
      }
    })
  }).processSync(selector)
}
