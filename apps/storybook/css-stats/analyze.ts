// oxlint-disable no-console -- CLI script: reports to stdout
/**
 * Summarizes a stylesheet dump written by `collect.test.tsx`, or compares two of them.
 *
 *   pnpm css-stats:analyze <stats.json> [<after-stats.json>]
 *
 * Per styled component (attributed to its defining module) it reports:
 * - classes: generated class names (one per distinct evaluated CSS string)
 * - rules: rules inserted into the sheet (top level, as styled-components inserts them)
 * - styleRules: style rules, counting the ones nested in at-rules
 * - decls: declarations
 * - dupBlocks: style rules whose declaration block (in the same at-rule context) was already
 *   emitted by another rule of the same component
 * - dupDecls: declarations already emitted for the same selector pattern (class names
 *   normalized) and at-rule context by another class of the same component
 * - bytes: UTF-8 bytes of the emitted CSS
 */
import fs from 'node:fs'

interface Dump {
  stories: {id: string; theme: string; error?: string}[]
  origins: Record<string, {source: string; name: string} | null>
  groups: {group: number; id: string; names: string[]; rules: string[]}[]
  levels: {id: string; base: string | null; functions: string[]; calls: number; selfMs: number}[]
  timing: {styleMs: number; styleCalls: number; insertMs: number}
  insertMs?: Record<string, number>
}

interface Leaf {
  context: string
  selector: string
  declarations: string[]
}

interface Stats {
  styledComponents: number
  classes: number
  rules: number
  styleRules: number
  decls: number
  dupBlocks: number
  dupDecls: number
  bytes: number
}

const METRICS: (keyof Stats)[] = [
  'classes',
  'rules',
  'styleRules',
  'decls',
  'dupBlocks',
  'dupDecls',
  'bytes',
]

const CONDITIONAL_AT_RULE = /^@(media|supports|container|layer|document)\b/

function emptyStats(): Stats {
  return {
    styledComponents: 0,
    classes: 0,
    rules: 0,
    styleRules: 0,
    decls: 0,
    dupBlocks: 0,
    dupDecls: 0,
    bytes: 0,
  }
}

function splitBlocks(css: string): {prelude: string; body: string}[] {
  const blocks: {prelude: string; body: string}[] = []
  let depth = 0
  let paren = 0
  let quote = ''
  let start = 0
  let preludeEnd = 0

  for (let i = 0; i < css.length; i++) {
    const c = css[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = ''
      continue
    }
    if (c === '"' || c === "'") quote = c
    else if (c === '(') paren++
    else if (c === ')') paren--
    else if (paren === 0 && c === '{') {
      if (depth === 0) preludeEnd = i
      depth++
    } else if (paren === 0 && c === '}') {
      depth--
      if (depth === 0) {
        blocks.push({
          prelude: css.slice(start, preludeEnd).trim(),
          body: css.slice(preludeEnd + 1, i),
        })
        start = i + 1
      }
    }
  }

  return blocks
}

function splitDeclarations(body: string): string[] {
  const declarations: string[] = []
  let paren = 0
  let quote = ''
  let start = 0

  for (let i = 0; i <= body.length; i++) {
    const c = body[i]
    if (quote) {
      if (c === '\\') i++
      else if (c === quote) quote = ''
      continue
    }
    if (c === '"' || c === "'") quote = c
    else if (c === '(') paren++
    else if (c === ')') paren--
    else if ((c === ';' && paren === 0) || i === body.length) {
      const declaration = body.slice(start, i).trim()
      if (declaration) declarations.push(declaration)
      start = i + 1
    }
  }

  return declarations
}

function leaves(css: string, context = ''): Leaf[] {
  const result: Leaf[] = []

  for (const {prelude, body} of splitBlocks(css)) {
    if (CONDITIONAL_AT_RULE.test(prelude)) {
      result.push(...leaves(body, `${context}${prelude}|`))
    } else if (prelude.startsWith('@')) {
      result.push({context, selector: prelude, declarations: [body]})
    } else {
      result.push({context, selector: prelude, declarations: splitDeclarations(body)})
    }
  }

  return result
}

function moduleOf(dump: Dump, id: string): string {
  // styled-components 6.1 gives every mounted `createGlobalStyle` instance a group of its own,
  // named after the global style's id plus an instance counter
  const globalStyle = /^(sc-global-[A-Za-z]+)\d*$/.exec(id)
  const origin =
    dump.origins[id] ??
    (globalStyle
      ? Object.entries(dump.origins).find(
          ([key, value]) => value && key.replace(/\d+$/, '') === globalStyle[1],
        )?.[1]
      : null)
  if (origin) return origin.source.replace(/^packages\/ui\/src\//, '')
  return id.startsWith('sc-keyframes-') ? '(keyframes)' : '(unknown)'
}

function analyze(dump: Dump) {
  const allNames = new Set(dump.groups.flatMap((group) => group.names))
  const normalize = (selector: string) =>
    selector.replace(/\.([A-Za-z][\w-]*)/g, (match, name: string) =>
      allNames.has(name) ? '.&' : match,
    )

  const modules = new Map<string, Stats>()
  const total = emptyStats()
  const globalBlocks = new Set<string>()
  let globalDupBlocks = 0

  for (const group of dump.groups) {
    const stats = emptyStats()
    stats.styledComponents = 1
    stats.classes = group.names.length
    stats.rules = group.rules.length

    const blocks = new Set<string>()
    const decls = new Set<string>()

    for (const rule of group.rules) {
      stats.bytes += Buffer.byteLength(rule)

      for (const leaf of leaves(rule)) {
        stats.styleRules++
        stats.decls += leaf.declarations.length

        const block = `${leaf.context}{${leaf.declarations.join(';')}}`
        if (blocks.has(block)) stats.dupBlocks++
        else blocks.add(block)
        if (globalBlocks.has(block)) globalDupBlocks++
        else globalBlocks.add(block)

        const selector = `${leaf.context}${normalize(leaf.selector)}`
        for (const declaration of leaf.declarations) {
          const key = `${selector}{${declaration}}`
          if (decls.has(key)) stats.dupDecls++
          else decls.add(key)
        }
      }
    }

    const module = moduleOf(dump, group.id)
    modules.set(module, add(modules.get(module) ?? emptyStats(), stats))
    add(total, stats)
  }

  return {modules, total, globalDupBlocks}
}

function add(target: Stats, stats: Stats): Stats {
  target.styledComponents += stats.styledComponents
  for (const metric of METRICS) target[metric] += stats[metric]
  return target
}

function isStoryLocal(module: string) {
  return /(^|\/)(stories|\.storybook)\//.test(module)
}

function format(n: number) {
  return n.toLocaleString('en-US')
}

function formatBytes(n: number) {
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(2)} MB` : `${(n / 1024).toFixed(1)} kB`
}

function delta(before: number, after: number) {
  if (before === after) return '='
  if (before === 0) return 'new'
  const pct = ((after - before) / before) * 100
  return `${pct > 0 ? '+' : ''}${pct.toFixed(pct > -1 && pct < 1 ? 1 : 0)}%`
}

function summaryTable(result: ReturnType<typeof analyze>) {
  const rows = [...result.modules.entries()]
    .filter(([module]) => !isStoryLocal(module))
    .toSorted(([, a], [, b]) => b.bytes - a.bytes)

  const lines = [
    '| Module | SCs | classes | rules | style rules | decls | dup blocks | dup decls | bytes |',
    '| --- | --: | --: | --: | --: | --: | --: | --: | --: |',
  ]
  for (const [module, s] of rows) {
    lines.push(
      `| \`${module}\` | ${s.styledComponents} | ${format(s.classes)} | ${format(s.rules)} | ${format(s.styleRules)} | ${format(s.decls)} | ${format(s.dupBlocks)} | ${format(s.dupDecls)} | ${formatBytes(s.bytes)} |`,
    )
  }
  return lines.join('\n')
}

function compareTable(before: ReturnType<typeof analyze>, after: ReturnType<typeof analyze>) {
  const modules = new Set(
    [...before.modules.keys(), ...after.modules.keys()].filter((m) => !isStoryLocal(m)),
  )
  const rows = [...modules]
    .map((module) => ({
      module,
      before: before.modules.get(module) ?? emptyStats(),
      after: after.modules.get(module) ?? emptyStats(),
    }))
    .toSorted((a, b) => b.before.bytes - a.before.bytes)

  const lines = [
    '| Module | rules before | rules after | Δ | dup decls before | dup decls after | bytes before | bytes after | Δ |',
    '| --- | --: | --: | --: | --: | --: | --: | --: | --: |',
  ]
  const totals = {before: emptyStats(), after: emptyStats()}
  for (const {module, before: b, after: a} of rows) {
    add(totals.before, b)
    add(totals.after, a)
    lines.push(
      `| \`${module}\` | ${format(b.rules)} | ${format(a.rules)} | ${delta(b.rules, a.rules)} | ${format(b.dupDecls)} | ${format(a.dupDecls)} | ${formatBytes(b.bytes)} | ${formatBytes(a.bytes)} | ${delta(b.bytes, a.bytes)} |`,
    )
  }
  const b = totals.before
  const a = totals.after
  lines.push(
    `| **Total** | **${format(b.rules)}** | **${format(a.rules)}** | **${delta(b.rules, a.rules)}** | **${format(b.dupDecls)}** | **${format(a.dupDecls)}** | **${formatBytes(b.bytes)}** | **${formatBytes(a.bytes)}** | **${delta(b.bytes, a.bytes)}** |`,
  )
  return lines.join('\n')
}

function totalsLine(name: string, result: ReturnType<typeof analyze>) {
  const library = emptyStats()
  for (const [module, stats] of result.modules) if (!isStoryLocal(module)) add(library, stats)
  return `${name}: ${library.styledComponents} styled components, ${format(library.classes)} classes, ${format(library.rules)} rules, ${format(library.styleRules)} style rules, ${format(library.decls)} declarations, ${format(library.dupBlocks)} duplicate blocks, ${format(library.dupDecls)} duplicate declarations, ${formatBytes(library.bytes)} (whole sheet incl. story-local: ${format(result.total.rules)} rules, ${formatBytes(result.total.bytes)}, ${format(result.globalDupBlocks)} cross-component duplicate blocks)`
}

/**
 * Static levels have no function interpolations: styled-components 6.5 then concatenates their
 * strings instead of evaluating, flattening and joining interpolations on every render, and v7
 * skips the evaluation altogether. 6.1 only takes its static path in production and when every
 * base level is static as well (`ComponentStyle#isStatic`).
 */
function staticLevels(dump: Dump) {
  const levels = new Map(dump.levels.map((level) => [level.id, level]))
  const isStaticChain = (id: string | null): boolean => {
    const level = id === null ? undefined : levels.get(id)
    return !level || (level.functions.length === 0 && isStaticChain(level.base))
  }
  const library = dump.levels
    .map((level) => {
      const origin = dump.origins[level.id]
      const module = moduleOf(dump, level.id)
      return {...level, module, name: `${module}#${origin?.name ?? level.id}`}
    })
    .filter((level) => !isStoryLocal(level.module))
    .toSorted((a, b) => a.name.localeCompare(b.name))

  return {
    library,
    total: library.length,
    static: library.filter((level) => level.functions.length === 0).length,
    staticChains: library.filter((level) => isStaticChain(level.id)).length,
  }
}

function staticTable(dump: Dump) {
  const lines = [
    '| Styled component level | Static | Dynamic because of | Generations | Self time |',
    '| --- | --- | --- | --: | --: |',
  ]
  for (const level of staticLevels(dump).library) {
    const reasons = [...new Set(level.functions)].map((name) => `\`${name}\``).join(', ')
    lines.push(
      `| \`${level.name}\` | ${level.functions.length ? 'no' : 'yes'} | ${reasons} | ${format(level.calls)} | ${level.selfMs.toFixed(1)} ms |`,
    )
  }
  return lines.join('\n')
}

function performanceLine(name: string, dump: Dump) {
  const levels = staticLevels(dump)
  const {styleMs, styleCalls, insertMs} = dump.timing
  return `${name}: ${levels.static}/${levels.total} levels static (${levels.staticChains} static in 6.1 production), ${format(styleCalls)} style generations in ${styleMs.toFixed(0)} ms (${((styleMs / styleCalls) * 1000).toFixed(1)} µs each), ${insertMs.toFixed(0)} ms inserting rules`
}

function moduleTimes(dump: Dump) {
  const times = new Map<string, {styleMs: number; insertMs: number}>()
  const get = (id: string) => {
    const module = moduleOf(dump, id)
    let entry = times.get(module)
    if (!entry) times.set(module, (entry = {styleMs: 0, insertMs: 0}))
    return entry
  }
  for (const level of dump.levels) get(level.id).styleMs += level.selfMs
  for (const [id, ms] of Object.entries(dump.insertMs ?? {})) get(id).insertMs += ms
  return times
}

function timesTable(before: Dump[], after: Dump[]) {
  const mean = (dumps: Dump[], module: string, key: 'styleMs' | 'insertMs') =>
    dumps.reduce((sum, dump) => sum + (moduleTimes(dump).get(module)?.[key] ?? 0), 0) /
    dumps.length
  const modules = new Set([...before, ...after].flatMap((dump) => [...moduleTimes(dump).keys()]))
  const rows = [...modules]
    .filter((module) => !isStoryLocal(module))
    .map((module) => ({
      module,
      styleBefore: mean(before, module, 'styleMs'),
      styleAfter: mean(after, module, 'styleMs'),
      insertBefore: mean(before, module, 'insertMs'),
      insertAfter: mean(after, module, 'insertMs'),
    }))
    .toSorted((a, b) => b.styleBefore + b.insertBefore - (a.styleBefore + a.insertBefore))
  const lines = [
    '| Module | style generation before | after | insertion before | after |',
    '| --- | --: | --: | --: | --: |',
  ]
  const total = {styleBefore: 0, styleAfter: 0, insertBefore: 0, insertAfter: 0}
  for (const row of rows) {
    total.styleBefore += row.styleBefore
    total.styleAfter += row.styleAfter
    total.insertBefore += row.insertBefore
    total.insertAfter += row.insertAfter
    lines.push(
      `| \`${row.module}\` | ${row.styleBefore.toFixed(1)} ms | ${row.styleAfter.toFixed(1)} ms | ${row.insertBefore.toFixed(1)} ms | ${row.insertAfter.toFixed(1)} ms |`,
    )
  }
  lines.push(
    `| **Total** | **${total.styleBefore.toFixed(0)} ms** | **${total.styleAfter.toFixed(0)} ms** | **${total.insertBefore.toFixed(0)} ms** | **${total.insertAfter.toFixed(0)} ms** |`,
  )
  return lines.join('\n')
}

function load(file: string): Dump {
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
  return JSON.parse(fs.readFileSync(file, 'utf8')) as Dump
}

if (process.argv[2] === 'times') {
  const separator = process.argv.indexOf('--')
  const before = process.argv.slice(3, separator).map(load)
  const after = process.argv.slice(separator + 1).map(load)
  console.log(timesTable(before, after))
  process.exit(0)
}

const [beforeFile, afterFile] = process.argv.slice(2)
if (!beforeFile) throw new Error('usage: analyze.ts <stats.json> [<after-stats.json>]')

const beforeDump = load(beforeFile)
const failed = beforeDump.stories.filter((story) => story.error)
const before = analyze(beforeDump)

console.log(`Story renders: ${beforeDump.stories.length} (${failed.length} failed)`)
for (const story of failed) console.log(`  failed: ${story.id} (${story.theme}): ${story.error}`)

if (afterFile) {
  const afterDump = load(afterFile)
  const after = analyze(afterDump)
  console.log(totalsLine('Before', before))
  console.log(totalsLine('After', after))
  console.log(performanceLine('Before', beforeDump))
  console.log(performanceLine('After', afterDump))
  console.log()
  console.log(compareTable(before, after))
} else {
  console.log(totalsLine('Total', before))
  console.log(performanceLine('Total', beforeDump))
  console.log()
  console.log(summaryTable(before))
  console.log()
  console.log(staticTable(beforeDump))
}
