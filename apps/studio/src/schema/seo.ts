import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  type: 'object',
  name: 'seo',
  title: 'SEO',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'text',
      name: 'description',
      title: 'Description',
    }),
    defineField({
      type: 'object',
      name: 'twitter',
      title: 'Twitter',
      fields: [
        defineField({
          type: 'string',
          name: 'cardType',
          title: 'Card type',
          options: {
            list: [
              {
                title: 'summary',
                value: 'summary',
              },
              {
                title: 'summary_large_image',
                value: 'summary_large_image',
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'og',
      title: 'OpenGraph',
      fields: [
        defineField({
          type: 'string',
          name: 'type',
          title: 'Type',
          options: {
            list: [
              {
                title: 'website',
                value: 'website',
              },
            ],
          },
        }),
        defineField({
          type: 'string',
          name: 'title',
          title: 'Title',
        }),
        defineField({
          type: 'text',
          name: 'description',
          title: 'Description',
        }),
        defineField({
          type: 'image',
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
  ],
})
