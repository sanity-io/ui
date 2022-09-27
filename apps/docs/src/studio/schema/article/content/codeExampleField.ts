import {CodeBlockIcon} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const codeExampleField = defineArrayMember({
  icon: CodeBlockIcon,
  type: 'object',
  name: 'codeExample',
  title: 'code example',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'text',
      name: 'description',
      title: 'Description',
    },
    {
      type: 'code',
      name: 'code',
      title: 'Code',
    },
    {
      type: 'code',
      name: 'hook',
      title: 'React hook code',
    },
    {
      type: 'text',
      name: 'caption',
      title: 'Caption',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
