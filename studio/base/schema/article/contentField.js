import {codeExampleField} from './codeExampleField'

export const contentField = {
  type: 'array',
  name: 'content',
  title: 'Content',
  of: [{type: 'block'}, codeExampleField],
}
