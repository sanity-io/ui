import {contentField} from './content/contentField'

const titleField = {type: 'string', name: 'title', title: 'Title'}

export const article = {
  type: 'document',
  name: 'article',
  title: 'Article',
  fields: [
    titleField,
    contentField,
    {
      type: 'object',
      name: 'layout',
      title: 'Layout',
      fields: [{type: 'boolean', name: 'wide', title: 'Wide'}],
    },
  ],
}
