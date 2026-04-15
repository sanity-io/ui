import {Expression} from 'jscodeshift'

export interface AnyExpression extends Expression {
  type: string
  value?: unknown
  elements?: unknown
  quasis?: unknown
  expressions?: unknown
}

export type AttributeMappings = Record<string | number, string | boolean | number>

type AttributeMod =
  | {type: 'remove'}
  | {type: 'rename-only'; name: string}
  | {type: 'rename-mapped'; name: string; mappings: AttributeMappings}
  | {type: 'style-only'; style: string}
  | {type: 'style-mapped'; style: string; mappings: AttributeMappings}
  | {type: 'mapped-only'; mappings: AttributeMappings}

export type AttributeMods = Record<string, AttributeMod>
