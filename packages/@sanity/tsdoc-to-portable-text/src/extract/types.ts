/**
 * @public
 */
export interface TSDocCustomTag {
  name: string
  syntaxKind: 'block' | 'modifier'
  allowMultiple?: boolean
}
