import fs from 'node:fs'
import {createRequire} from 'node:module'
import path from 'node:path'

const EXTENSIONS = ['', '.ts', '.tsx', '.mts', '.js', '.mjs', '.jsx']

function nearestPackageJson(fromFile) {
  let dir = path.dirname(fromFile)
  for (;;) {
    const candidate = path.join(dir, 'package.json')
    if (fs.existsSync(candidate)) {
      return {dir, pkg: JSON.parse(fs.readFileSync(candidate, 'utf8'))}
    }
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

/**
 * StyleX hashes *atomic* class names by content (property + value + pseudo/at-rule),
 * but `defineVars`/`defineConsts` names are hashed from a canonical *file id*:
 * `<package name>:<path inside package>//<export name>`. That id does not include
 * the package version, so two versions of one package that both declare
 * `:root { --<hash>: <default> }` would fight over the same variable when their
 * stylesheets meet on one page (last stylesheet wins) — the one path-based
 * identifier left in StyleX.
 *
 * This `custom` resolution plugs the package *version* into the id and normalizes
 * the path so that a library build (`src/tokens.stylex.ts`) and a consumer that
 * imports the published file (`dist/tokens.stylex.js`) compute the same id:
 *
 *   `@sanity-eval/stylex-button@1.0.0:tokens.stylex//tokens`
 *
 * Both sides must use the same helper — the equivalent of a shared
 * `@sanity/stylex-config` preset. Everything else (atomic classes, `createTheme`
 * classes, keyframes) is already content-addressed.
 */
export function versionScopedModuleResolution() {
  return {
    type: 'custom',
    filePathResolver(importPath, sourceFilePath) {
      if (importPath.startsWith('.')) {
        const base = path.resolve(path.dirname(sourceFilePath), importPath)
        for (const ext of EXTENSIONS) {
          const candidate = base + ext
          if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate
        }
        return undefined
      }
      try {
        return createRequire(sourceFilePath).resolve(importPath)
      } catch {
        return undefined
      }
    },
    getCanonicalFilePath(filePath) {
      const found = nearestPackageJson(filePath)
      if (!found) return filePath
      const relative = path
        .relative(found.dir, filePath)
        .split(path.sep)
        .slice(1) // drop the `src/` | `dist/` segment
        .join('/')
        .replace(/\.[cm]?[jt]sx?$/, '')
      return `${found.pkg.name}@${found.pkg.version}:${relative}`
    },
  }
}

/**
 * StyleX's stock resolution: `<package name>:<path>` — identical for every version
 * of the package. Kept here so the hazard script can show both behaviours.
 */
export function packageScopedModuleResolution(rootDir) {
  return {type: 'commonJS', rootDir}
}
