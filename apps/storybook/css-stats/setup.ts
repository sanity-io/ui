import {__PRIVATE__, styled} from 'styled-components'

/**
 * Instruments styled-components before any component module is evaluated:
 *
 * - `StyleSheet.registerId(componentId)` is called from the `ComponentStyle` (v6) / `WebStyle` (v7)
 *   constructor, which runs synchronously inside the `styled.x` / `styled(X)` call at module
 *   evaluation time. The caller frames of that call identify the module (and line) that defines
 *   the component.
 * - `StyleSheet#insertRules(componentId, name, rules)` receives the CSS exactly as the CSS
 *   preprocessor emitted it, once per new class name, before the CSSOM normalizes it (and drops
 *   rules the browser doesn't support).
 * - `ComponentStyle#generateAndInjectStyles` (v6) / `WebStyle#generate` (v7) runs for every level
 *   of a styled component whose props changed, base level first, which records the levels in use
 *   and times the style generation per render.
 */
interface ComponentStyle {
  componentId: string
  rules: unknown[]
  baseStyle?: ComponentStyle | null
}

declare global {
  var __cssStats: {
    origins: Map<string, string>
    inserted: Map<string, {id: string; name: string; rules: string[]}>
    styles: Map<ComponentStyle, {calls: number; selfMs: number}>
    timing: {styleMs: number; styleCalls: number; insertMs: number}
    insertMsById: Map<string, number>
  }
}

const origins = new Map<string, string>()
const inserted = new Map<string, {id: string; name: string; rules: string[]}>()
const styles = new Map<ComponentStyle, {calls: number; selfMs: number}>()
const timing = {styleMs: 0, styleCalls: 0, insertMs: 0}
const insertMsById = new Map<string, number>()
globalThis.__cssStats = {origins, inserted, styles, timing, insertMsById}

Error.stackTraceLimit = 100

const {StyleSheet} = __PRIVATE__
const registerId = StyleSheet.registerId.bind(StyleSheet)

StyleSheet.registerId = (id: string) => {
  if (!origins.has(id)) origins.set(id, new Error('registerId').stack ?? '')
  return registerId(id)
}

// oxlint-disable-next-line typescript/unbound-method
const insertRules = StyleSheet.prototype.insertRules

StyleSheet.prototype.insertRules = function (id: string, name: string, rules: string[]) {
  const key = `${id}\n${name}`
  if (!inserted.has(key)) inserted.set(key, {id, name, rules: [...rules]})
  const start = performance.now()
  try {
    return insertRules.call(this, id, name, rules)
  } finally {
    const ms = performance.now() - start
    timing.insertMs += ms
    insertMsById.set(id, (insertMsById.get(id) ?? 0) + ms)
  }
}

// An explicit componentId doesn't advance the counter that generated componentIds (and so class
// names) are derived from
const probe = styled.div.withConfig({componentId: 'css-stats-probe'})``
const prototype: Record<string, (this: ComponentStyle, ...args: unknown[]) => unknown> =
  Object.getPrototypeOf(probe.componentStyle)
const method = 'generateAndInjectStyles' in prototype ? 'generateAndInjectStyles' : 'generate'
const generate = prototype[method]
// Time spent in the base levels of each level on the call stack
const baseMs: number[] = []

prototype[method] = function (...args) {
  baseMs.push(0)
  const start = performance.now()
  try {
    return generate.apply(this, args)
  } finally {
    const ms = performance.now() - start
    const level = styles.get(this) ?? {calls: 0, selfMs: 0}
    level.calls++
    level.selfMs += ms - (baseMs.pop() ?? 0)
    styles.set(this, level)
    if (baseMs.length) {
      baseMs[baseMs.length - 1] += ms
    } else {
      timing.styleMs += ms
      timing.styleCalls++
    }
  }
}
