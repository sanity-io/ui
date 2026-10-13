import type {Plugin} from 'rolldown'

export const STYLEX_COMPILER: 'babel' | 'rs'
export function versionedClassNamePrefix(packageDir: string): string
export function stylexLibraryPlugins(options: {
  packageDir: string
  fileName?: string
  [option: string]: unknown
}): Plugin[]
