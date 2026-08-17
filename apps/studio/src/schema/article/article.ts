import {defineField, defineType} from 'sanity'

import {
  calloutBlock,
  codeBlock,
  colorGridBlock,
  figmaButtonBlock,
  figmaEmbedBlock,
  groqLogoGridBlock,
  imageBlock,
  sanityLogoGridBlock,
} from './content/blocks'
import {codeExampleField} from './content/codeExampleField'
import {npmPackageBadgeField} from './content/npmPackageBadgeField'
import {propertyTableField} from './content/propertyTableField'

export const articleType = defineType({
  type: 'document',
  name: 'article',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),
    defineField({
      type: 'object',
      name: 'figma',
      title: 'Figma',
      fields: [
        defineField({
          type: 'string',
          name: 'title',
          title: 'Title',
        }),
        defineField({
          type: 'string',
          name: 'url',
          title: 'URL',
          description: 'The URL to a Figma resource',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
    defineField({
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [
        {type: 'block'},
        codeBlock,
        codeExampleField,
        npmPackageBadgeField,
        propertyTableField,
        colorGridBlock,
        sanityLogoGridBlock,
        groqLogoGridBlock,
        imageBlock,
        calloutBlock,
        figmaEmbedBlock,
        figmaButtonBlock,
      ],
    }),
    defineField({
      type: 'seo',
      name: 'seo',
      title: 'SEO',
    }),
    defineField({
      type: 'object',
      name: 'layout',
      title: 'Layout',
      fields: [
        defineField({
          type: 'boolean',
          name: 'wide',
          title: 'Wide layout',
        }),
      ],
    }),
    defineField({
      type: 'object',
      name: 'apiMember',
      title: 'API member',
      fields: [
        defineField({
          type: 'boolean',
          name: 'isComponent',
          title: 'Is component',
        }),
        defineField({
          type: 'boolean',
          name: 'isHook',
          title: 'Is hook',
        }),
      ],
    }),
  ],
})
