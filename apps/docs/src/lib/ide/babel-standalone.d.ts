/**
 * Minimal type declarations for the `@babel/standalone` API surface used by
 * the arcade. The package ships no types of its own, and the DefinitelyTyped
 * package (`@types/babel__standalone`) targets v7.
 */
declare module '@babel/standalone' {
  export interface TransformOptions {
    presets?: (string | [string, Record<string, unknown>])[]
  }

  export interface TransformResult {
    code: string | null
  }

  export function transform(code: string, options: TransformOptions): TransformResult
}
