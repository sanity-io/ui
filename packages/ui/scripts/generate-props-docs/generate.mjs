#!/usr/bin/env node
// Extracts the real prop surface of every Sanity UI v5 component.
//
// Two sources, deliberately:
//   1. The `*Props` record is imported and read as a live value. That resolves
//      spreads from shared groups, real union values, and composite mappings —
//      none of which a source parser gets right.
//   2. The `*Props` interface is parsed for the things only the source knows:
//      the JSDoc description, whether a prop is required, and the TS type.
//
// The record decides which props exist, and the interface enriches them.
// The exception is a prop the interface declares and the record does not
// list. The record only holds props that map to CSS, so callbacks and
// children never appear in it. Those come from the interface alone (see
// `interfaceOnlyProps`). Before 2026-09-24 they were dropped, which removed
// four required props from the served tables: Dialog `onClose`,
// SkipToContent `href`, and Tooltip and Popover `children`.
import {readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync} from 'node:fs'
import {join, dirname, relative} from 'node:path'
import {fileURLToPath} from 'node:url'

import {eventIndex} from './events.mjs'
import {indexSource, resolveInterface} from './jsdoc.mjs'
import {writeMarkdown} from './markdown.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
// Runs inside packages/ui (scripts/generate-props-docs/), so the package root is two levels up.
const UI_ROOT = join(HERE, '../..')
const SRC = join(UI_ROOT, 'src')
// Generated prop docs ship in the package: dist/props-docs/, next to the built code.
const OUT = join(UI_ROOT, 'dist')
const DOCS_DIR = join(OUT, 'props-docs')

if (!existsSync(SRC)) {
  console.error(`Sanity UI source not found at ${SRC}`)
  process.exit(1)
}

const dashToPascal = (s) => s.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())

/** Flatten one PropDef into a documented prop. */
function describe(name, def, doc) {
  const p = {
    name,
    kind: def.type,
    required: doc?.required ?? false,
    description: doc?.description ?? null,
    type: doc?.type ?? null,
  }
  if (doc?.from) p.inheritedFrom = doc.from

  if (def.type === 'union') {
    p.values = [...(def.values ?? [])]
  } else if (def.type === 'composite') {
    // The thing a naive extractor gets wrong: one prop that sets several.
    p.values = [...(def.values ?? [])]
    p.expandsTo = {}
    for (const [target, spec] of Object.entries(def.composition ?? {})) {
      p.expandsTo[target] = {
        kind: spec.propDef?.type ?? 'unknown',
        mapping: {...(spec.mapping ?? {})},
      }
    }
  } else if (def.type === 'conditional') {
    // resolve() is a function; record that the shape depends on the value
    // rather than pretending to know it.
    p.resolvesByValue = true
  }
  if (def.className) p.cssClass = def.className
  if (def.variable) p.cssVariable = def.variable
  return p
}

/** A component whose whole API is DOM passthrough has no props record to read.
 *  `ListItemImage(props: ComponentProps<'img'>)` is not missing — there is
 *  simply nothing to enumerate, which is a documentable fact rather than a gap. */
function domOnlyComponents(compDir, dir, recordKeys) {
  const tsxName = readdirSync(compDir).find((f) => /^[A-Z]\w*\.tsx$/.test(f))
  if (!tsxName) return []
  const src = readFileSync(join(compDir, tsxName), 'utf8')

  // How sub-components are exposed: `ListRoot.ItemImage = ListItemImage`
  const attachedAs = new Map()
  for (const m of src.matchAll(/\w+\.(\w+)\s*=\s*(\w+)/g)) attachedAs.set(m[2], m[1])

  const out = []
  const fnRe = /function\s+([A-Z]\w*)\s*(?:<[^>]*>)?\s*\(\s*(?:props|\{[^}]*\})\s*:\s*([^)]+?)\)/gs
  for (const m of src.matchAll(fnRe)) {
    const [, fnName, paramType] = m
    const type = paramType.trim()
    const tag = type.match(/^(?:React\.)?ComponentProps<\s*'([^']+)'/)
    if (!tag) continue
    // Skip anything a record already covers.
    const recordName = fnName[0].toLowerCase() + fnName.slice(1) + 'Props'
    if (recordKeys.includes(recordName)) continue

    const suffix = attachedAs.get(fnName)
    const id = suffix
      ? `${dir}-${suffix.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`
      : fnName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    out.push({
      id,
      name: fnName,
      directory: dir,
      sourceFile: relative(UI_ROOT, join(compDir, tsxName)),
      propsFile: null,
      domOnly: true,
      alsoAccepts: [`native <${tag[1]}> attributes`],
      inherits: [],
      props: [],
    })
  }
  return out
}

/**
 * Where a polymorphic component's spread props actually land.
 *
 * The props INTERFACE is not always the answer. `ButtonProps` declares no
 * native surface at all — the passthrough is on the function signature:
 *
 *   function Button<T extends ElementType = 'button'>(
 *     props: ButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof ButtonProps<T>>
 *   )
 *
 * Read the interface only and Button accepts nothing native, which is why the
 * most-used clickable component in the system documented no `onClick`. Read
 * the signature and the default of `T` is the element, and it is the element
 * `...rest` is spread onto.
 *
 * Where the two disagree the signature wins, because it describes where the
 * props go. `ListButtonItem` is the case that proves it: its interface extends
 * `ListItemProps` (an `<li>`), and its body spreads `...rest` onto a PressArea
 * rendered as `<button>` while the `<li>` wrapper receives nothing. Every
 * disagreement is recorded as an extraction note rather than resolved silently.
 *
 * Both halves must be present — a generic defaulted to a tag AND a parameter
 * type that instantiates `ComponentProps*` with it. A component generic over
 * `T` that never spreads it forwards nothing, and claiming otherwise would be
 * the one failure mode this tool does not accept.
 */
function polymorphicTargets(src) {
  const out = new Map()
  const re =
    /function\s+([A-Z]\w*)\s*<\s*T\s+extends\s+(?:React\.)?ElementType\s*=\s*'([a-z][a-z0-9]*)'\s*>\s*\(([\s\S]*?)\)\s*\{/g
  for (const [, fnName, tag, params] of src.matchAll(re)) {
    if (!/ComponentProps(?:With(?:out)?Ref)?<\s*T\s*>/.test(params)) continue
    out.set(fnName, tag)
  }
  return out
}

/**
 * The native events a component accepts, for the tag its props type extends.
 *
 * `alsoAccepts` is where the tag is recorded — "native <select> attributes" —
 * because the runtime props record cannot enumerate the DOM. This turns that
 * sentence into the handlers themselves, read from @types/react.
 */
function nativeEvents(alsoAccepts, events) {
  if (!events) return null
  for (const entry of alsoAccepts) {
    const tag = /^native <(\w+)> attributes$/.exec(entry)?.[1]
    if (!tag) continue
    const surface = events.forTag(tag)
    if (surface) return {source: events.source, ...surface}
  }
  return null
}

/**
 * Public names for the parts a file attaches to its root. `TabsRoot.List =
 * TabsList` with `export const Tabs = TabsRoot` names `TabsList`'s props as
 * `Tabs.List`. Keyed by props type, because that is what a record's entry knows.
 */
function attachedNames(src) {
  const fnProps = new Map()
  for (const m of src.matchAll(
    /function\s+(\w+)\s*(?:<[^>]*>)?\s*\(\s*(?:\{[^}]*\}|\w+)\s*:\s*(\w+)/g,
  )) {
    fnProps.set(m[1], m[2])
  }
  const rootAlias = new Map()
  for (const m of src.matchAll(/^export const (\w+) = (\w+)\s*$/gm)) rootAlias.set(m[2], m[1])
  const out = new Map()
  for (const m of src.matchAll(/^(\w+)\.(\w+)\s*=\s*(\w+)\s*$/gm)) {
    const [, root, attachedAs, fn] = m
    const propsType = fnProps.get(fn)
    if (propsType) out.set(propsType, `${rootAlias.get(root) ?? root}.${attachedAs}`)
  }
  return out
}

async function main() {
  const {interfaces, globalDocs, conflicts} = indexSource(SRC)
  const components = []
  const problems = []

  // Events come from the installed React types, not from this repo. Without
  // them the tool reports no events rather than inventing any, and says so.
  const events = eventIndex(UI_ROOT)
  if (!events) {
    problems.push({
      issue: 'no @types/react resolvable from the UI checkout — native events omitted',
      severity: 'info',
    })
  }

  const dirs = readdirSync(join(SRC, 'components'), {withFileTypes: true})
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort()

  // Every runtime PropDef record in the source, by its export name.
  //
  // A picked prop's shape lives in the record it was picked FROM — `tone`'s
  // union is in `buttonProps`, not in `iconButtonProps`, because IconButton
  // forwards the prop rather than handling it. Resolving that needs the other
  // record, so all of them are loaded before any component is built rather
  // than relying on alphabetical order putting `button` before `icon-button`.
  const records = new Map()
  for (const dir of dirs) {
    const pf = readdirSync(join(SRC, 'components', dir)).find((f) => f.endsWith('.props.ts'))
    if (!pf) continue
    try {
      const m = await import(join(SRC, 'components', dir, pf))
      for (const [k, v] of Object.entries(m)) {
        if (/Props$/.test(k) && typeof v === 'object' && v !== null) records.set(k, v)
      }
    } catch {
      // Reported per-component by the main loop; a failure here just means
      // picked props from this record cannot be resolved.
    }
  }

  // Records in props/ are shared groups (layoutProps, toneProps, ...). A component
  // reaches them by extending their interface, so they are loaded too.
  for (const f of readdirSync(join(SRC, 'props'))) {
    if (!f.endsWith('.ts')) continue
    try {
      const m = await import(join(SRC, 'props', f))
      for (const [k, v] of Object.entries(m)) {
        if (/Props$/.test(k) && typeof v === 'object' && v !== null && !records.has(k))
          records.set(k, v)
      }
    } catch {
      // A shared group that fails to load only costs the props it would add.
    }
  }

  /**
   * Props the interface declares that no record lists.
   *
   * These have no PropDef, so there is no CSS class or value list to report.
   * `kind` is read from the TS type instead, and `source: 'interface'` says
   * where the row came from.
   *
   * Only members the interface declares itself count. Inherited members are
   * not safe to add: the resolver follows `Pick<>` and `Omit<>` parents as if
   * they were plain `extends`, so IconButton would gain Button's `text`.
   */
  function interfaceOnlyProps(ifaceName, iface, have) {
    const out = []
    const own = interfaces.get(ifaceName)?.members ?? new Map()
    for (const [name] of own) {
      const doc = iface.members.get(name)
      if (have.has(name) || !doc) continue
      const t = doc.type ?? ''
      const kind = /=>|EventHandler\b|Handler</.test(t)
        ? 'function'
        : /ReactNode|ReactElement|JSX\.Element/.test(t)
          ? 'node'
          : /^(boolean|string|number)$/.test(t)
            ? t
            : 'type'
      const prop = describe(name, {type: kind}, doc)
      prop.source = 'interface'
      out.push(prop)
      have.add(name)
    }
    return out
  }

  /**
   * Props a component gets by extending a shared record. `TabsPanelProps`
   * extends `LayoutProps`, and `layoutProps` holds the real props.
   */
  function inheritedRecordProps(ifaceName, iface, have) {
    const out = []
    for (const parent of interfaces.get(ifaceName)?.plainLocals ?? []) {
      const record = records.get(parent[0].toLowerCase() + parent.slice(1))
      if (!record) continue
      for (const name of Object.keys(record)) {
        if (have.has(name)) continue
        const prop = describe(name, record[name], iface.members.get(name))
        prop.inheritedFrom = parent
        out.push(prop)
        have.add(name)
      }
    }
    return out
  }

  /** Props an interface picks off another component's record. */
  function pickedProps(iface, have, ifaceName) {
    const out = []
    for (const pick of iface.picks ?? []) {
      // `ButtonProps` is declared alongside the record `buttonProps`.
      const record = records.get(pick.from[0].toLowerCase() + pick.from.slice(1))
      if (!record) continue
      for (const name of pick.names) {
        if (have.has(name) || !record[name]) continue
        const doc = iface.members.get(name)
        const prop = describe(name, record[name], doc)
        prop.inheritedFrom = prop.inheritedFrom ?? pick.from
        out.push(prop)
        have.add(name)
      }
    }
    return out
  }

  for (const dir of dirs) {
    const compDir = join(SRC, 'components', dir)
    const propsFile = readdirSync(compDir).find((f) => f.endsWith('.props.ts'))
    if (!propsFile) {
      problems.push({component: dir, issue: 'no .props.ts file'})
      continue
    }

    let mod
    try {
      mod = await import(join(compDir, propsFile))
    } catch (e) {
      problems.push({component: dir, issue: `could not evaluate: ${e.message}`})
      continue
    }

    // A directory can hold more than one component — `list` exports listProps,
    // listItemProps, listItemTextProps and listButtonItemProps. Each gets its
    // own entry rather than being merged into the directory's name.
    const recordsHere = Object.fromEntries(
      Object.entries(mod).filter(
        ([k, v]) => /Props$/.test(k) && typeof v === 'object' && v !== null,
      ),
    )
    // A component can declare its props as an interface alone, with no
    // runtime record — VStack and HStack became `Pick<FlexProps, 'as' | 'gap'>`
    // in v5 commit 06f2cffe. Skipping them left the MCP serving a stale table
    // for the two most-used layout parts. Build them from the interface: an
    // empty record, with picks and own members supplying the props.
    if (!Object.keys(recordsHere).length) {
      const src = readFileSync(join(compDir, propsFile), 'utf8')
      for (const [, name] of src.matchAll(/export interface (\w+Props)\b/g)) {
        recordsHere[name[0].toLowerCase() + name.slice(1)] = {}
      }
      if (!Object.keys(recordsHere).length) {
        problems.push({component: dir, issue: 'no *Props record or interface exported'})
        continue
      }
      problems.push({
        component: dir,
        severity: 'info',
        issue: 'no *Props record; props built from the interface alone',
      })
    }
    const recordKeys = Object.keys(recordsHere)

    const tsxFile = readdirSync(compDir).find((f) => /^[A-Z]\w*\.tsx$/.test(f))
    const polymorphic = tsxFile
      ? polymorphicTargets(readFileSync(join(compDir, tsxFile), 'utf8'))
      : new Map()

    const attached = tsxFile
      ? attachedNames(readFileSync(join(compDir, tsxFile), 'utf8'))
      : new Map()

    // Components in this directory whose entire API is native DOM attributes.
    for (const c of domOnlyComponents(compDir, dir, recordKeys)) {
      c.events = nativeEvents(c.alsoAccepts, events)
      components.push(c)
      problems.push({
        component: dir,
        record: c.name,
        issue: `no props of its own — accepts ${c.alsoAccepts[0]} only`,
        severity: 'info',
      })
    }

    for (const recordKey of recordKeys.sort()) {
      const record = recordsHere[recordKey]
      const ifaceName = recordKey[0].toUpperCase() + recordKey.slice(1)
      const iface = resolveInterface(ifaceName, interfaces)
      if (!interfaces.has(ifaceName)) {
        problems.push({
          component: dir,
          record: recordKey,
          issue: `declaration ${ifaceName} not found; descriptions will be sparse`,
        })
      }

      const have = new Set(Object.keys(record))
      const props = Object.entries(record)
        .map(([name, def]) => describe(name, def, iface.members.get(name) ?? globalDocs.get(name)))
        .concat(pickedProps(iface, have, ifaceName))
        .concat(inheritedRecordProps(ifaceName, iface, have))
        .concat(interfaceOnlyProps(ifaceName, iface, have))
        .sort((a, b) => a.name.localeCompare(b.name))

      const undocumented = props.filter((p) => !p.description).map((p) => p.name)
      if (undocumented.length) {
        problems.push({
          component: dir,
          record: recordKey,
          issue: `no description in source for: ${undocumented.join(', ')}`,
        })
      }

      // id: the directory for the primary record, dash-cased otherwise.
      const primary = recordKey === `${dir.replace(/-(\w)/g, (_, c) => c.toUpperCase())}Props`
      const id = primary
        ? dir
        : recordKey
            .replace(/Props$/, '')
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase()
      const sourceFile = readdirSync(compDir).find((f) => /^[A-Z]\w*\.tsx$/.test(f))

      const componentName = ifaceName.replace(/Props$/, '')
      const polymorphicTag = polymorphic.get(componentName)
      const fromInterface = [...new Set(iface.external)]
      // The signature describes where `...rest` goes; the interface describes
      // what the type extends. When both speak, the first one is the one a
      // caller's onClick actually reaches.
      const alsoAccepts = polymorphicTag ? [`native <${polymorphicTag}> attributes`] : fromInterface
      if (
        polymorphicTag &&
        fromInterface.length &&
        !alsoAccepts.every((a) => fromInterface.includes(a))
      ) {
        problems.push({
          component: dir,
          record: recordKey,
          severity: 'info',
          issue: `spread target disagrees with the declaration: signature renders <${polymorphicTag}> by default, ${ifaceName} extends ${fromInterface.join(', ')} — using the signature`,
        })
      }

      components.push({
        id,
        name: attached.get(ifaceName) ?? componentName,
        directory: dir,
        sourceFile: sourceFile ? relative(UI_ROOT, join(compDir, sourceFile)) : null,
        propsFile: relative(UI_ROOT, join(compDir, propsFile)),
        // Props the record can't list, because they come from the DOM.
        alsoAccepts,
        // `as` can change the element, so the tag is a default, not a fact.
        ...(polymorphicTag ? {polymorphic: {prop: 'as', defaultTag: polymorphicTag}} : {}),
        events: nativeEvents(alsoAccepts, events),
        inherits: iface.chain.filter((c) => c !== ifaceName),
        props,
      })
    }
  }

  mkdirSync(DOCS_DIR, {recursive: true})
  const result = {
    generatedFrom: relative(UI_ROOT, SRC),
    eventsFrom: events?.source ?? null,
    componentCount: components.length,
    propCount: components.reduce((n, c) => n + c.props.length, 0),
    components,
  }
  writeFileSync(join(DOCS_DIR, 'components.json'), JSON.stringify(result, null, 2) + '\n')
  writeMarkdown(components, DOCS_DIR)

  const kinds = {}
  for (const c of components) for (const p of c.props) kinds[p.kind] = (kinds[p.kind] || 0) + 1
  console.log(`${components.length} components, ${result.propCount} props`)
  console.log(
    'by kind:',
    Object.entries(kinds)
      .map(([k, v]) => `${k} ${v}`)
      .join(', '),
  )
  const noDesc = components.reduce((n, c) => n + c.props.filter((p) => !p.description).length, 0)
  console.log(`descriptions: ${result.propCount - noDesc}/${result.propCount}`)
  console.log(
    `composites expanded: ${components.reduce((n, c) => n + c.props.filter((p) => p.kind === 'composite').length, 0)}`,
  )
  const withEvents = components.filter((c) => c.events)
  const eventCount = withEvents.reduce((n, c) => n + c.events.handlers.length, 0)
  console.log(`markdown: ${components.length} tables -> dist/props-docs/`)
  console.log(
    `events: ${eventCount} handlers on ${withEvents.length} components, from ${events?.source ?? 'nothing — types not resolvable'}`,
  )
  // Notes about the extraction, printed rather than written to a file.
  if (problems.length)
    console.log(`\n${problems.length} extraction note(s); pass --verbose to list them`)
  if (process.argv.includes('--verbose')) for (const p of problems) console.log(p)
  if (conflicts.length)
    console.log(`${conflicts.length} description conflict(s) across shared prop groups`)
}

main()
