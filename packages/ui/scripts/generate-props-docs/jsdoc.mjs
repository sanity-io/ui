// Reads what only the source knows: a prop's JSDoc description, whether it is
// optional, and the TypeScript type as written. The evaluated prop record is
// authoritative for which props exist; this only enriches them.
//
// Handles both shapes the v5 source uses — `export interface X extends A {}`
// and `export type X = A & { ... }` — and brace-matches the body rather than
// regexing it, because the bodies contain nested generics and object types.
import {readFileSync, readdirSync} from 'node:fs'
import {join} from 'node:path'

const DECL = /export\s+(?:interface|type)\s+(\w+)(?:<[^={]*?>)?\s*(?:=)?\s*([^{]*?)\{/g
const MEMBER = /(?:\/\*\*([\s\S]*?)\*\/\s*)?'?([A-Za-z][\w-]*)'?(\?)?:\s*([^\n]+)/g

function cleanDoc(raw) {
  if (!raw) return null
  const text = raw
    .split('\n')
    .map((l) => l.replace(/^\s*\*?\s?/, '').trim())
    .filter((l) => l && !l.startsWith('@'))
    .join(' ')
    .trim()
  return text || null
}

/** Body of the object type starting at the `{` at index `open`. */
function braceBody(src, open) {
  let depth = 0
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (!depth) return src.slice(open + 1, i)
    }
  }
  return ''
}

/** Names this declaration builds on, from an `extends` clause or an `&` chain. */
function parseHeritage(clause) {
  const locals = []
  const external = []
  // `extends Pick<ButtonProps<T>, 'as' | 'tone'>` names an exact subset. The
  // members are needed for descriptions either way, but the SUBSET is what
  // makes the props themselves recoverable: the runtime record a component
  // exports lists only the props it handles itself, and a picked prop is
  // handled by the component it was picked from. IconButton is the whole
  // reason this is parsed — it picks `as, density, level, loading, tone` off
  // ButtonProps and forwards them, and reading the record alone published an
  // API of three props for a component that takes seven.
  const picks = []
  if (!clause) return {locals, plainLocals: [], external, picks}
  for (const m of clause.matchAll(/(Pick|Omit)<\s*(\w+)(?:<[^>]*>)?\s*,\s*([^>]+)>/g)) {
    if (m[1] !== 'Pick') continue
    const names = m[3]
      .split('|')
      .map((x) => x.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
    if (names.length) picks.push({from: m[2], names})
  }
  locals.push(...localNames(clause))
  const tag = clause.match(/ComponentProps<\s*'([^']+)'/)
  if (tag) external.push(`native <${tag[1]}> attributes`)
  else if (/ComponentProps|HTMLAttributes|SVGProps/.test(clause))
    external.push('native DOM attributes')
  // Pick and Omit name a subset or a rewrite of their parent, so only the
  // plain parents here carry the whole parent's props.
  const plainLocals = localNames(withoutPickOmit(clause))
  return {locals: [...new Set(locals)], plainLocals, external: [...new Set(external)], picks}
}

/** Named types in a clause, minus the wrappers and the built-ins that are not props. */
function localNames(text) {
  const names = []
  for (const m of text.matchAll(/(?:Pick|Omit|Partial|Required)<\s*(\w+)|(\b[A-Z]\w*)/g)) {
    const name = m[1] || m[2]
    if (
      !name ||
      [
        'Pick',
        'Omit',
        'Partial',
        'Required',
        'React',
        'ComponentProps',
        'HTMLAttributes',
        'SVGProps',
        'JSX',
      ].includes(name)
    )
      continue
    names.push(name)
  }
  return [...new Set(names)]
}

/** `clause` with each `Pick<...>` and `Omit<...>` removed, nested generics included. */
function withoutPickOmit(clause) {
  let out = clause
  for (let m = /\b(Pick|Omit)</.exec(out); m; m = /\b(Pick|Omit)</.exec(out)) {
    let depth = 0
    let end = m.index + m[1].length
    for (let i = end; i < out.length; i++) {
      if (out[i] === '<') depth++
      else if (out[i] === '>') {
        depth--
        if (!depth) {
          end = i + 1
          break
        }
      }
    }
    out = out.slice(0, m.index) + ' ' + out.slice(end)
  }
  return out
}

/** `type` aliases of props whose body is not a plain `{ ... }` object. */
const ALIAS = /(?:export\s+)?type\s+(\w+Props)(?:<[^=]*?>)?\s*=\s*/g

/** Index of the `}` that closes the `{` at `open`. */
function closeIndex(src, open) {
  let depth = 0
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}') {
      depth--
      if (!depth) return i
    }
  }
  return src.length
}

/** Bodies of the `{ ... }` blocks at the top level of `text`, in order. */
function topLevelBodies(text) {
  const out = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '{') continue
    const end = closeIndex(text, i)
    out.push(text.slice(i + 1, end))
    i = end
  }
  return out
}

/** `text` with its top-level `{ ... }` blocks removed. */
function outsideBlocks(text) {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== '{') {
      out += text[i]
      continue
    }
    i = closeIndex(text, i)
  }
  return out
}

/**
 * The text of a `type` alias: its first line, then the lines that continue it.
 * A continuation starts with whitespace, `|` or `&`. A blank line ends it.
 */
function aliasText(src, start) {
  const [first, ...rest] = src.slice(start).split('\n')
  const lines = [first]
  for (const line of rest) {
    if (!line || !/^(\s|[|&])/.test(line)) break
    lines.push(line)
  }
  return lines.join('\n')
}

/** Members of one object-type body. A `;` separates members on one line. */
function membersOf(body) {
  const out = new Map()
  for (const mm of body.replace(/;/g, '\n').matchAll(MEMBER)) {
    const [, doc, prop, optional, type] = mm
    if (!/^[a-z]/.test(prop)) continue
    out.set(prop, {
      description: cleanDoc(doc),
      required: !optional,
      type: type.replace(/\s+/g, ' ').trim(),
    })
  }
  return out
}

function propFiles(uiSrcDir) {
  const out = []
  for (const d of readdirSync(join(uiSrcDir, 'components'), {withFileTypes: true})) {
    if (!d.isDirectory()) continue
    for (const f of readdirSync(join(uiSrcDir, 'components', d.name))) {
      if (f.endsWith('.props.ts')) out.push(join(uiSrcDir, 'components', d.name, f))
    }
  }
  for (const f of readdirSync(join(uiSrcDir, 'props'))) {
    if (f.endsWith('.ts')) out.push(join(uiSrcDir, 'props', f))
  }
  return out
}

export function indexSource(uiSrcDir) {
  const interfaces = new Map()
  const globalDocs = new Map()
  const conflicts = []
  const aliases = new Map()

  for (const file of propFiles(uiSrcDir)) {
    const src = readFileSync(file, 'utf8')
    for (const m of src.matchAll(ALIAS)) {
      const text = aliasText(src, m.index + m[0].length)
      if (!/^\s*\{/.test(text)) aliases.set(m[1], {text, file})
    }
    for (const m of src.matchAll(DECL)) {
      const [full, name, heritage] = m
      const open = m.index + full.length - 1
      const body = braceBody(src, open)
      const members = new Map()
      for (const mm of body.matchAll(MEMBER)) {
        const [, doc, prop, optional, type] = mm
        if (!/^[a-z]/.test(prop)) continue
        members.set(prop, {
          description: cleanDoc(doc),
          required: !optional,
          type: type
            .replace(/\s+/g, ' ')
            .replace(/[,;]\s*$/, '')
            .trim(),
        })
      }
      interfaces.set(name, {members, ...parseHeritage(heritage), file})
      if (file.includes('/props/')) {
        for (const [prop, info] of members) {
          const prev = globalDocs.get(prop)
          if (
            prev &&
            info.description &&
            prev.description &&
            prev.description !== info.description
          ) {
            conflicts.push({prop, a: prev.description, b: info.description})
          }
          if (!prev || (!prev.description && info.description)) globalDocs.set(prop, info)
        }
      }
    }
  }
  // A props alias such as `Omit<A, 'x'> & B` has no `{ ... }` body for DECL to
  // read, so it was indexed with no members. Its own members come from the
  // object types it lists, and from any local alias it names, as a union would.
  const ownMembers = (name, stack = []) => {
    const raw = aliases.get(name)
    if (!raw || stack.includes(name)) return new Map()
    const bodies = topLevelBodies(raw.text)
    const union = bodies.length > 1
    const members = new Map()
    const add = (k, v) => {
      const prev = members.get(k)
      // A union can give one key two types, such as `aria-label?: never` in one branch.
      if (!prev || prev.type === 'never') members.set(k, v)
    }
    for (const body of bodies) {
      for (const [k, v] of membersOf(body)) add(k, union ? {...v, required: false} : v)
    }
    for (const local of parseHeritage(outsideBlocks(raw.text)).plainLocals) {
      for (const [k, v] of ownMembers(local, [...stack, name])) add(k, v)
    }
    return members
  }
  for (const name of aliases.keys()) {
    if (interfaces.get(name)?.members.size) continue
    const heritage = parseHeritage(outsideBlocks(aliases.get(name).text))
    interfaces.set(name, {members: ownMembers(name), ...heritage, file: aliases.get(name).file})
  }
  return {interfaces, globalDocs, conflicts}
}

/** Walk a declaration and everything it builds on. Nearest wins. */
export function resolveInterface(name, interfaces, seen = new Set()) {
  const out = {members: new Map(), external: [], chain: [], picks: []}
  const decl = interfaces.get(name)
  if (!decl || seen.has(name)) return out
  seen.add(name)
  out.chain.push(name)
  for (const parent of decl.locals) {
    const inherited = resolveInterface(parent, interfaces, seen)
    for (const [k, v] of inherited.members) {
      if (!out.members.has(k)) out.members.set(k, {...v, from: v.from || parent})
    }
    out.external.push(...inherited.external)
    out.chain.push(...inherited.chain)
    out.picks.push(...inherited.picks)
  }
  for (const [k, v] of decl.members) out.members.set(k, v)
  out.external.push(...decl.external)
  out.picks.push(...(decl.picks ?? []))
  return out
}
