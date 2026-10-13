import {transform} from 'lightningcss'

export interface ClassRules {
  /** class name → set of normalized rules (with their at-rule context) that mention it */
  byClass: Map<string, Set<string>>
  ruleCount: number
}

/**
 * Normalizes a stylesheet with lightningcss (so formatting differences never
 * count as rule differences) and indexes every style rule by the class names in
 * its selector, keeping the enclosing at-rule chain as part of the rule text.
 */
export function indexRulesByClass(css: string): ClassRules {
  const normalized = transform({
    filename: 'sheet.css',
    code: Buffer.from(css),
    minify: true,
  }).code.toString()

  const byClass = new Map<string, Set<string>>()
  let ruleCount = 0
  const atRules: string[] = []
  let i = 0

  while (i < normalized.length) {
    const open = normalized.indexOf('{', i)
    if (open === -1) break
    const prelude = normalized.slice(i, open).trim()
    if (prelude.startsWith('@') && !prelude.startsWith('@font-face') && !prelude.startsWith('@property')) {
      // keyframes bodies also nest, but StyleX keyframes are name-hashed; treat as context
      atRules.push(prelude)
      i = open + 1
      continue
    }
    const close = normalized.indexOf('}', open)
    const body = normalized.slice(open + 1, close)
    const rule = `${atRules.map((a) => `${a}{`).join('')}${prelude}{${body}}${'}'.repeat(atRules.length)}`
    ruleCount++
    for (const match of prelude.matchAll(/\.(x[0-9a-z]+)/g)) {
      const cls = match[1]!
      let set = byClass.get(cls)
      if (!set) byClass.set(cls, (set = new Set()))
      set.add(rule)
    }
    i = close + 1
    // pop closed at-rules
    while (atRules.length && normalized[i] === '}') {
      atRules.pop()
      i++
    }
  }
  return {byClass, ruleCount}
}

export function compareSheets(a: ClassRules, b: ClassRules) {
  const shared: string[] = []
  const conflicts: {className: string; a: string[]; b: string[]}[] = []
  for (const [cls, rulesA] of a.byClass) {
    const rulesB = b.byClass.get(cls)
    if (!rulesB) continue
    shared.push(cls)
    const sa = [...rulesA].sort()
    const sb = [...rulesB].sort()
    if (sa.join('\n') !== sb.join('\n')) conflicts.push({className: cls, a: sa, b: sb})
  }
  return {
    classesA: a.byClass.size,
    classesB: b.byClass.size,
    shared,
    onlyA: [...a.byClass.keys()].filter((c) => !b.byClass.has(c)).length,
    onlyB: [...b.byClass.keys()].filter((c) => !a.byClass.has(c)).length,
    conflicts,
  }
}
