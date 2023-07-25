import chokidar from 'chokidar'

declare global {
  // eslint-disable-next-line no-var
  var $workshopWatcher: chokidar.FSWatcher | undefined
}

function _sanitizeModulePath(modulePath: string) {
  return modulePath.replace(/\.[^/.]+$/, '').replace(/\/index$/, '')
}

export function _compileModule(paths: string[]): string {
  if (paths.length === 0) {
    return `// THIS FILE IS AUTO-GENERATED\n\nexport const scopes = []\n`
  }

  const sortedPaths = paths.sort()
  const imports = sortedPaths
    .map((p, idx) => `import _${idx} from '${_sanitizeModulePath(p)}'`)
    .join('\n')
  const exports = sortedPaths.map((_p, idx) => `  _${idx}`).join(',\n')
  const code =
    [`// THIS FILE IS AUTO-GENERATED`, imports, `export const scopes = [\n${exports},\n]`].join(
      '\n\n',
    ) + `\n`

  return code
}
