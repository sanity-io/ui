import {icons} from '@sanity/icons'

export const settings = {
  type: 'document',
  name: 'settings',
  title: 'Title',
  fields: [
    {
      type: 'object',
      name: 'banner',
      title: 'Banner',
      fields: [
        {
          type: 'boolean',
          name: 'hidden',
          title: 'Hidden',
        },
        {
          type: 'string',
          name: 'icon',
          title: 'Icon',
          options: {
            list: Object.keys(icons),
          },
        },
        {
          type: 'string',
          name: 'title',
          title: 'Title',
        },
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title',
            },
            {
              type: 'string',
              name: 'href',
              title: 'Hyperlink reference',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({title: 'Website settings'}),
  },
}
