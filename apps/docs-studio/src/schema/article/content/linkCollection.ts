import {defineArrayMember} from 'sanity'

export const linkCollectionBlock = defineArrayMember({
  type: 'object',
  name: 'content.linkCollection',
  title: 'Link collection',
  fields: [
    {type: 'string', name: 'title', title: 'Title'},
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'content.linkCollection.item',
          title: 'Link',
          fields: [
            {type: 'image', name: 'image', title: 'Image'},
            {type: 'string', name: 'title', title: 'Title'},
            {type: 'string', name: 'href', title: 'URL'},
            // {type: 'string', name: 'subtitle', title: 'Subtitle'},
            {type: 'array', name: 'description', title: 'Description', of: [{type: 'block'}]},
          ],
        }),
      ],
    },
  ],
})
