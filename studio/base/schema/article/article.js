import {contentField} from './contentField'

const titleField = {type: 'string', name: 'title', title: 'Title'}
const slugField = {type: 'slug', name: 'slug', title: 'Slug'}

export const article = {
  type: 'document',
  name: 'article',
  title: 'Article',
  fields: [titleField, slugField, contentField],
}
