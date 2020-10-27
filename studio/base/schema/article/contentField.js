import {codeExampleField} from './codeExampleField'
import {propertyTableField} from './propertyTableField'
const codeField = {
  type: 'code',
  name: 'code',
  title: 'Code',
}

export const contentField = {
  type: 'array',
  name: 'content',
  title: 'Content',
  of: [{type: 'block'}, codeField, codeExampleField, propertyTableField],
}
