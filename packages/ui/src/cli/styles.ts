import {existsSync, readdirSync, readFileSync, statSync, writeFileSync} from 'node:fs'
import {dirname, join, relative} from 'node:path'

export const STYLES_SPECIFIER = '@sanity/ui/styles.css'
const IMPORT_LINE = `import '${STYLES_SPECIFIER}'`
// Match a real import/require of the stylesheet, not a bare mention. A
// commented-out or string occurrence of the path must not count as "wired",
// or doctor/init would report success when the import isn't active.
const SPEC = String.raw`@sanity/ui/styles\.css`
const PRESENT = new RegExp(
  String.raw`(?:^|\n)\s*import\s+(?:[^\n'"]*\bfrom\s+)?['"]${SPEC}['"]` +
    String.raw`|\brequire\(\s*['"]${SPEC}['"]\s*\)`,
)
const SOURCE_EXT = /\.[jt]sx?$|\.astro$/
const SKIP_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  '.next',
  '.react-router',
  '.git',
  'out',
])
const SOURCE_ROOTS = ['src', 'app', 'pages', 'components']
const MAX_FILES = 800

export interface StylesheetInfo {
  entry: string
  file: string
  exists: boolean
  imported: boolean
  importedIn?: string
}

export interface WireResult {
  entry: string
  file: string
  imported: boolean
  wrote: boolean
  missing?: boolean
  already?: boolean
}

export function hasStylesImport(content: string): boolean {
  return PRESENT.test(content)
}

function fileImports(file: string): boolean {
  try {
    return hasStylesImport(readFileSync(file, 'utf8'))
  } catch {
    return false
  }
}

/** Bounded recursive walk that returns the first source file importing the stylesheet. */
function findImportInDir(root: string, budget: {count: number}): string | null {
  const stack = [root]
  while (stack.length > 0 && budget.count < MAX_FILES) {
    const dir = stack.pop()
    if (dir === undefined) break
    let entries
    try {
      entries = readdirSync(dir, {withFileTypes: true})
    } catch {
      continue
    }
    for (const entry of entries) {
      const full = join(dir, entry.name)
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) stack.push(full)
      } else if (SOURCE_EXT.test(entry.name)) {
        budget.count++
        if (budget.count > MAX_FILES) break
        if (fileImports(full)) return full
      }
    }
  }
  return null
}

/**
 * Reports whether the stylesheet is imported. The import only needs to exist
 * once in the module graph, so beyond the prescribed entry we scan the project
 * source roots (bounded) before reporting it missing. That catches imports
 * placed in App.tsx, a route file, or a layout component.
 */
export function inspectStylesheet(cwd: string, entry: string): StylesheetInfo {
  const file = join(cwd, entry)
  const exists = existsSync(file)
  if (exists && fileImports(file)) return {entry, file, exists, imported: true}

  const budget = {count: 0}
  const roots = new Set([dirname(entry), ...SOURCE_ROOTS].map((r) => join(cwd, r)))
  for (const root of Array.from(roots)) {
    if (!existsSync(root)) continue
    try {
      if (!statSync(root).isDirectory()) continue
    } catch {
      continue
    }
    const found = findImportInDir(root, budget)
    if (found)
      return {
        entry,
        file,
        exists,
        imported: true,
        importedIn: relative(cwd, found),
      }
  }

  return {entry, file, exists, imported: false}
}

function isDirective(line: string): boolean {
  const trimmed = line.trim()
  return /^['"]use (client|server|strict)['"];?$/.test(trimmed)
}

function isImportLine(line: string): boolean {
  return /^\s*import\b/.test(line)
}

/**
 * True when an import statement finishes on this line: either it ends with a
 * `from '...'` clause or it is a bare side-effect `import '...'`. Used to find
 * the real end of an import block so we never split a multiline import.
 */
function importStatementEnds(line: string): boolean {
  const t = line.trim()
  return /\bfrom\s*['"][^'"]+['"];?\s*$/.test(t) || /^import\s+['"][^'"]+['"];?\s*$/.test(t)
}

/** Inserts the import into a JS/TS module after any leading directive + import block. */
function injectIntoModule(content: string): string {
  const lines = content.split('\n')
  let insertAt = 0

  while (insertAt < lines.length) {
    const line = lines[insertAt] ?? ''
    if (isDirective(line) || line.trim() === '') insertAt++
    else break
  }

  // Track the last line that closes an import statement so a multiline import
  // (`import {\n  a,\n} from 'x'`) is treated as a single unit and we insert
  // after its closing line, never between its lines.
  let lastImport = -1
  let inMultilineImport = false
  for (let i = insertAt; i < lines.length; i++) {
    const line = lines[i] ?? ''
    if (inMultilineImport) {
      if (importStatementEnds(line)) {
        inMultilineImport = false
        lastImport = i
      }
      continue
    }
    if (isImportLine(line)) {
      lastImport = i
      if (!importStatementEnds(line)) inMultilineImport = true
    } else if (line.trim() !== '' && lastImport !== -1) {
      break
    }
  }

  const at = lastImport === -1 ? insertAt : lastImport + 1
  lines.splice(at, 0, IMPORT_LINE)
  return lines.join('\n')
}

/** Inserts the import inside an Astro frontmatter fence, creating one if absent. */
function injectIntoAstro(content: string): string {
  if (content.startsWith('---')) {
    const end = content.indexOf('\n---', 3)
    if (end !== -1) {
      const head = content.slice(0, end)
      const tail = content.slice(end)
      return `${head}\n${IMPORT_LINE}${tail}`
    }
  }
  return `---\n${IMPORT_LINE}\n---\n${content}`
}

export function wireStylesheet(cwd: string, entry: string, {dryRun = false} = {}): WireResult {
  const file = join(cwd, entry)
  if (!existsSync(file)) return {entry, file, missing: true, imported: false, wrote: false}

  const content = readFileSync(file, 'utf8')
  if (hasStylesImport(content)) {
    return {
      entry,
      file,
      missing: false,
      imported: true,
      wrote: false,
      already: true,
    }
  }

  const next = entry.endsWith('.astro') ? injectIntoAstro(content) : injectIntoModule(content)
  if (!dryRun) writeFileSync(file, next)
  return {entry, file, missing: false, imported: true, wrote: !dryRun}
}
