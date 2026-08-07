import type {Expression} from 'jscodeshift'

export interface AnyExpression extends Expression {
  type: string
  name?: string
  value?: unknown
  elements?: unknown
  quasis?: unknown
  expressions?: unknown
}
