export interface CustomModuleResolution {
  type: 'custom'
  filePathResolver(importPath: string, sourceFilePath: string): string | undefined
  getCanonicalFilePath(filePath: string): string
}

export function versionScopedModuleResolution(): CustomModuleResolution
export function packageScopedModuleResolution(rootDir: string): {type: 'commonJS'; rootDir: string}
