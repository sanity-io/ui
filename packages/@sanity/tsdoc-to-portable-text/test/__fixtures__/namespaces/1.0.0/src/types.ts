/**
 * @public
 */
export namespace Schema {
  interface BaseDefinition {
    name: string
  }

  export interface DocumentSchemaDefinition extends BaseDefinition {
    type: 'document'
  }

  export interface ObjectSchemaDefinition {
    type: 'document'
  }

  export interface ArraySchemaDefinition {
    type: 'array'
  }

  export type Test = number
}
