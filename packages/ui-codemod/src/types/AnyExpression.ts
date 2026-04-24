import type {Expression} from 'jscodeshift'

export interface AnyExpression extends Expression {
  type: string
  value?: unknown
  elements?: unknown
  quasis?: unknown
  expressions?: unknown
}

export type AttributeMapping = Record<string | number, string | boolean | number | undefined>

export type AttributeMod =
  | {type: 'remove'}
  | {type: 'rename-only'; name: string}
  | {type: 'rename-mapped'; name: string; mapping: AttributeMapping}
  | {type: 'style-only'; style: string}
  | {type: 'style-mapped'; style: string; mapping: AttributeMapping}
  | {type: 'mapped-only'; mapping: AttributeMapping}
  | {type: 'composite-mapped'; composition: {name: string; mapping: AttributeMapping}[]}

export type AttributeMods = Record<string, AttributeMod>
