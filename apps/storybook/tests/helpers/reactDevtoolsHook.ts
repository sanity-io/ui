/**
 * A minimal React DevTools global hook. React reports every commit to it the way it does to the
 * DevTools profiler: with the commit's Scheduler priority (1 "Immediate", 2 "User-blocking",
 * 3 "Normal", 5 "Idle") and, because a hook is present, `root.memoizedUpdaters`, the fibers whose
 * updates the commit rendered. `react-dom` looks the hook up once, as it evaluates, so this module
 * must be imported before anything imports `react-dom/client`, setup files included.
 */

interface RecordedCommit {
  priority: number
  /** The names of the components whose updates the commit rendered */
  updaters: string[]
}

interface FiberLike {
  tag: number
  type: unknown
}

const HOOK_GLOBAL = '__REACT_DEVTOOLS_GLOBAL_HOOK__'

export const commits: RecordedCommit[] = []

/** Whether this module installed the hook: nothing is recorded when another was there first */
export const installed: boolean = install()

function install(): boolean {
  if (Reflect.has(globalThis, HOOK_GLOBAL)) return false

  const renderers = new Map<number, unknown>()

  Reflect.set(globalThis, HOOK_GLOBAL, {
    supportsFiber: true,
    renderers,
    inject(renderer: unknown) {
      const id = renderers.size + 1

      renderers.set(id, renderer)

      return id
    },
    checkDCE() {},
    onScheduleFiberRoot() {},
    onCommitFiberRoot(_id: number, root: {memoizedUpdaters?: Set<FiberLike>}, priority: number) {
      commits.push({priority, updaters: Array.from(root.memoizedUpdaters ?? [], nameOf)})
    },
    onCommitFiberUnmount() {},
    onPostCommitFiberRoot() {},
    setStrictMode() {},
  })

  return true
}

function nameOf(fiber: FiberLike): string {
  return typeof fiber.type === 'function' ? fiber.type.name : `tag:${fiber.tag}`
}
