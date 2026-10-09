/**
 * A minimal React DevTools global hook, installed before `react-dom/client` evaluates (import this
 * module first), so that React reports every commit to it the way it does to the DevTools
 * profiler: `onCommitFiberRoot(rendererID, root, schedulerPriority)` with the Scheduler priority
 * DevTools displays as the commit's priority (1 "Immediate", 2 "User-blocking", 3 "Normal", 5
 * "Idle") and, because the hook is present, `root.memoizedUpdaters` holding the fibers whose
 * updates the commit rendered (what DevTools lists under "What caused this update?").
 *
 * The hook only records when it is the hook React found: `react-dom` reads the global once, as it
 * evaluates, so this module has to run before anything imports `react-dom/client` — including the
 * setup files of the Vitest project, which run before the imports of a test file do. `installed`
 * tells whether this module got to install its hook; a test should assert it (and that commits
 * are being recorded) before relying on what was recorded, since an empty record makes every
 * negative assertion pass for nothing.
 */

export interface RecordedCommit {
  /** `performance.now()` when React reported the commit */
  time: number
  /** Scheduler priority: 1 Immediate (SyncLane), 2 UserBlocking, 3 Normal (Default and transition lanes), 5 Idle */
  priority: number
  /** Component names of the fibers that scheduled the updates rendered in this commit */
  updaters: string[]
}

interface FiberLike {
  type: unknown
  tag: number
}

interface RootLike {
  memoizedUpdaters?: Set<FiberLike>
}

/** The shapes `fiber.type` takes for the components whose names matter in a failure message */
interface NamedType {
  displayName?: string
  name?: string
  /** `forwardRef(render)` */
  render?: NamedType
  /** `memo(component)` */
  type?: NamedType
}

export const commits: RecordedCommit[] = []

function nameOf(fiber: FiberLike): string {
  return nameOfType(fiber.type) ?? `tag:${fiber.tag}`
}

function nameOfType(type: unknown): string | undefined {
  if (typeof type === 'function') return type.name || 'anonymous'
  if (typeof type === 'string') return type
  if (!type || typeof type !== 'object') return undefined

  // `memo(forwardRef(render))` nests: the name is the innermost one that has one
  const named = type as NamedType

  return (
    named.displayName ||
    named.name ||
    (named.render && nameOfType(named.render)) ||
    (named.type && nameOfType(named.type)) ||
    undefined
  )
}

/** The global React looks the hook up by; through `Reflect`, so no type is declared for it */
const HOOK_GLOBAL = '__REACT_DEVTOOLS_GLOBAL_HOOK__'

/**
 * Whether this module installed the hook React reports to. `false` when another hook was there
 * first (a DevTools extension in a headed browser, a setup file that installed one), in which
 * case nothing is ever recorded here.
 */
export const installed: boolean = install()

function install(): boolean {
  if (Reflect.has(globalThis, HOOK_GLOBAL)) return false

  let nextId = 1
  const renderers = new Map<number, unknown>()

  Reflect.set(globalThis, HOOK_GLOBAL, {
    supportsFiber: true,
    renderers,
    inject(renderer: unknown) {
      const id = nextId++
      renderers.set(id, renderer)
      return id
    },
    checkDCE() {},
    onScheduleFiberRoot() {},
    onCommitFiberRoot(_id: number, root: RootLike, priority: number) {
      commits.push({
        time: performance.now(),
        priority,
        updaters: Array.from(root.memoizedUpdaters ?? [], nameOf),
      })
    },
    onCommitFiberUnmount() {},
    onPostCommitFiberRoot() {},
    setStrictMode() {},
  })

  return true
}
