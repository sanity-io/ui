import type {API, Collection, FileInfo} from 'jscodeshift'

export type TransformContext = {
  j: API['jscodeshift']
  root: Collection
  markChanged: () => void
}

/**
 * Runs a component transform on a file and only calls `toSource()` when
 * `markChanged()` was invoked. Returns `undefined` for no-op files.
 */
export function transformComponent(
  fileInfo: FileInfo,
  api: API,
  fn: (ctx: TransformContext) => void,
): string | undefined {
  const j = api.jscodeshift
  const root = j(fileInfo.source)
  let hasChanges = false

  fn({
    j,
    root,
    markChanged: () => {
      hasChanges = true
    },
  })

  return hasChanges ? root.toSource() : undefined
}
