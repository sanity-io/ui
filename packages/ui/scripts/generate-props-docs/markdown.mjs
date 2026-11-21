// Renders one markdown prop table per component, into dist/props-docs/<id>.md.
//
// Ported from the standalone extractor's to-dsds.mjs. The DSDS $extensions
// output is not ported: it is for a serving layer, not for this package.
import {writeFileSync, mkdirSync} from 'node:fs'
import {join} from 'node:path'

function valueList(p) {
  if (!p.values?.length) return ''
  return p.values.map((v) => `\`${v}\``).join(' \\| ')
}

const esc = (t) => String(t).replace(/\|/g, '\\|')

function typeCell(p) {
  if (p.kind === 'union') return valueList(p) || `\`${esc(p.type ?? 'union')}\``
  if (p.kind === 'composite')
    return `${valueList(p)} — sets ${Object.keys(p.expandsTo)
      .map((k) => `\`${k}\``)
      .join(', ')}`
  if (p.kind === 'conditional') return `\`${esc(p.type ?? 'varies')}\` (shape depends on the value)`
  return `\`${esc(p.type ?? p.kind)}\``
}

function markdown(c) {
  const lines = [`## ${c.name} props`, '']
  lines.push(`Extracted from \`${c.propsFile ?? c.sourceFile}\`. Do not edit by hand.`, '')
  if (c.alsoAccepts.length && !c.domOnly) {
    lines.push(`Also accepts ${c.alsoAccepts.join(', ')}.`, '')
  }
  if (!c.props.length) {
    lines.push(
      c.domOnly
        ? `This component has no props of its own. It accepts ${c.alsoAccepts.join(', ')} and passes them through.`
        : 'No props could be extracted for this component.',
    )
    // A pure DOM passthrough has no prop table, which makes its events the
    // only interactive surface there is to document. Returning before the
    // event section is how it ended up with nothing at all.
    lines.push(...eventSection(c))
    return lines.join('\n') + '\n'
  }
  lines.push('| Prop | Type / values | Required | Description |', '|---|---|---|---|')
  for (const p of c.props) {
    const desc = esc(p.description ?? '—')
    lines.push(`| \`${p.name}\` | ${typeCell(p)} | ${p.required ? 'yes' : 'no'} | ${desc} |`)
  }
  const composites = c.props.filter((p) => p.kind === 'composite')
  if (composites.length) {
    lines.push('', '### Composite props', '')
    for (const p of composites) {
      lines.push(`\`${p.name}\` is one prop that sets several others:`, '')
      const targets = Object.keys(p.expandsTo)
      lines.push(`| \`${p.name}\` | ${targets.map((t) => `\`${t}\``).join(' | ')} |`)
      lines.push(`|---|${targets.map(() => '---').join('|')}|`)
      for (const v of p.values) {
        lines.push(
          `| \`${v}\` | ${targets.map((t) => `\`${p.expandsTo[t].mapping[v]}\``).join(' | ')} |`,
        )
      }
      lines.push('')
    }
  }
  lines.push(...eventSection(c))
  return lines.join('\n') + '\n'
}

/**
 * The events section. Present only when the component's props type extends a
 * DOM element, which is where native handlers come from.
 *
 * `specialized` is worth marking: `<select>`'s `onChange` carries a
 * `ChangeEvent` naming the element, while `onFocus` is the same `FocusEvent`
 * every element gets. That distinction is the difference between "read
 * `event.target.value`" working and not.
 */
function eventSection(c) {
  if (!c.events?.handlers?.length) return []
  const e = c.events
  const lines = ['', '### Events', '']
  lines.push(
    `Native \`<${e.tag}>\` handlers, forwarded to the underlying element. ` +
      `Read from \`${e.source}\`.`,
    '',
  )
  // The event TYPES move with the element, so a reader who changes `as`
  // cannot copy the signatures below unchanged.
  if (c.polymorphic) {
    lines.push(
      `\`<${c.polymorphic.defaultTag}>\` is the default element. ` +
        `\`${c.polymorphic.prop}\` changes it, and the event types change with it.`,
      '',
    )
  }
  lines.push('| Event | Signature | Element-specific |', '|---|---|---|')
  for (const h of e.handlers) {
    lines.push(
      `| \`${h.name}\` | \`${esc(h.signature ?? h.type)}\` | ${h.specialized ? 'yes' : 'no'} |`,
    )
  }
  const rest = e.nativeHandlerCount - e.handlers.length
  if (rest > 0) {
    lines.push(
      '',
      `\`<${e.tag}>\` accepts ${rest} further React handlers; these are the ones a component of this kind is normally wired to.`,
    )
  }
  return lines
}

/** Write one markdown table per component into `dir`. Returns the count. */
export function writeMarkdown(components, dir) {
  mkdirSync(dir, {recursive: true})
  for (const c of components) {
    writeFileSync(join(dir, `${c.id}.md`), markdown(c))
  }
  return components.length
}
