import {codeExampleField} from './codeExampleField'
import {propertyTableField} from './propertyTableField'

export const contentField = {
  type: 'array',
  name: 'content',
  title: 'Content',
  of: [{type: 'block'}, codeExampleField, propertyTableField],
}
