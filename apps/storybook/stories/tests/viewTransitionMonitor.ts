/**
 * The lifecycle of one `document.startViewTransition()` call, in `performance.now()` time
 */
export interface ViewTransitionRecord {
  id: number
  startedAt: number
  /** When the animation started, or `null` if it never did */
  readyAt: number | null
  /** When the transition finished, whether it animated or was skipped */
  finishedAt: number | null
  /** Why the animation never started, e.g. `AbortError: Transition was skipped` */
  error: string | null
  /** The call stack of the `skipTransition()` call that cancelled the transition */
  skippedBy: string | null
}

let records: readonly ViewTransitionRecord[] = []
const pending = new Set<Promise<void>>()
let nextId = 1
let installed = false

function update(id: number, patch: Partial<ViewTransitionRecord>) {
  records = records.map((record) => (record.id === id ? {...record, ...patch} : record))
}

function captureStack(): string {
  const {stackTraceLimit} = Error
  Error.stackTraceLimit = 50
  const stack = new Error('skipTransition()').stack ?? 'skipTransition()'
  Error.stackTraceLimit = stackTraceLimit

  return stack
}

/**
 * Wraps `document.startViewTransition()`, which is what React calls to animate `<ViewTransition>`
 * boundaries, to record whether each transition gets to animate. React cancels a transition that
 * is still preparing with `skipTransition()` when something forces a synchronous render (like
 * `flushSync()`), so the stack of that call points at the culprit.
 */
export function installViewTransitionMonitor(): void {
  if (installed || typeof document.startViewTransition !== 'function') return
  installed = true

  const startViewTransition = document.startViewTransition.bind(document)

  document.startViewTransition = (callbackOptions) => {
    const transition = startViewTransition(callbackOptions)
    const id = nextId++
    const skipTransition = transition.skipTransition.bind(transition)

    records = [
      ...records,
      {
        id,
        startedAt: performance.now(),
        readyAt: null,
        finishedAt: null,
        error: null,
        skippedBy: null,
      },
    ]

    transition.skipTransition = () => {
      if (!records.find((record) => record.id === id)?.skippedBy) {
        update(id, {skippedBy: captureStack()})
      }

      skipTransition()
    }

    transition.ready.then(
      () => update(id, {readyAt: performance.now()}),
      (error: unknown) => update(id, {error: String(error)}),
    )

    const finished = transition.finished
      .then(
        () => update(id, {finishedAt: performance.now()}),
        (error: unknown) => update(id, {error: String(error), finishedAt: performance.now()}),
      )
      .finally(() => pending.delete(finished))

    pending.add(finished)

    return transition
  }
}

/**
 * The recorded transitions, as a new array whenever one of them changes
 */
export function getViewTransitionRecords(): readonly ViewTransitionRecord[] {
  return records
}

export function clearViewTransitionRecords(): void {
  records = []
}

/**
 * Resolves once no view transition has been running for `quietPeriod` milliseconds, so the
 * transitions a component starts after the one that mounted it are waited for too.
 */
export async function waitForViewTransitionsToSettle(quietPeriod = 250): Promise<void> {
  let count: number

  do {
    count = records.length
    // oxlint-disable-next-line no-await-in-loop
    await Promise.all(pending)
    // oxlint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, quietPeriod))
  } while (pending.size > 0 || records.length !== count)
}
