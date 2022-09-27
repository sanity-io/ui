import {CubeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const screenType = defineType({
  type: 'document',
  name: 'screen',
  title: 'Screen',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'screenSection.hero',
          icon: CubeIcon,
          title: 'hero',
          fields: [
            defineField({
              type: 'string',
              name: 'headline',
            }),
            defineField({
              type: 'string',
              name: 'copy',
            }),

            defineField({
              type: 'array',
              name: 'ctas',
              title: 'CTAs',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'cta',
                  title: 'CTA',
                  fields: [
                    defineField({
                      type: 'string',
                      name: 'label',
                      title: 'Label',
                    }),
                    defineField({
                      type: 'string',
                      name: 'href',
                      title: 'URL',
                    }),
                    defineField({
                      type: 'string',
                      name: 'tone',
                      title: 'Tone',
                      options: {
                        list: ['default', 'primary'],
                      },
                    }),
                    defineField({
                      type: 'string',
                      name: 'mode',
                      title: 'Mode',
                      options: {
                        list: ['default', 'ghost'],
                      },
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              type: 'string',
              name: 'linksHeader',
            }),
            defineField({
              type: 'array',
              name: 'links',
              title: 'Links',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'link',
                  fields: [
                    defineField({
                      type: 'string',
                      name: 'title',
                    }),
                    defineField({
                      type: 'string',
                      name: 'subtitle',
                    }),
                    defineField({
                      type: 'string',
                      name: 'href',
                    }),
                  ],
                }),
              ],
            }),
            defineField({
              type: 'object',
              name: 'backgroundImage',
              title: 'Image',
              fields: [
                defineField({
                  type: 'image',
                  name: 'dark',
                  title: 'Dark mode',
                }),
                defineField({
                  type: 'image',
                  name: 'light',
                  title: 'Light mode',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'headline',
            },
            prepare({title}) {
              return {
                title,
                subtitle: 'Hero',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'SEO',
    }),
  ],
})
