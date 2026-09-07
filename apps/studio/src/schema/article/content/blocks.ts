import {icons} from '@sanity/icons'
import {defineArrayMember} from 'sanity'

export const figmaEmbedBlock = defineArrayMember({
  type: 'object',
  name: 'content.figmaEmbed',
  title: 'Figma embed',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'url',
      title: 'Figma URL',
    },
  ],
})

export const figmaButtonBlock = defineArrayMember({
  type: 'object',
  name: 'content.figmaButton',
  title: 'Figma button',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'url',
      title: 'URL',
    },
  ],
})

export const codeBlock = defineArrayMember({
  type: 'code',
  name: 'code',
  title: 'Code',
})

export const colorGridBlock = defineArrayMember({
  type: 'object',
  name: 'content.colorGrid',
  title: 'Color grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

export const sanityLogoGridBlock = defineArrayMember({
  type: 'object',
  name: 'content.sanityLogoGrid',
  title: 'Sanity logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

export const groqLogoGridBlock = defineArrayMember({
  type: 'object',
  name: 'content.groqLogoGrid',
  title: 'GROQ logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

export const imageBlock = defineArrayMember({
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text (for screen readers)',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
  ],
  options: {
    hotspot: true,
  },
})

export const calloutBlock = defineArrayMember({
  type: 'object',
  name: 'callout',
  title: 'Callout',
  fields: [
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
      name: 'tone',
      title: 'Tone',
      options: {
        list: ['primary', 'positive', 'caution', 'critical'],
      },
    },
    {type: 'array', name: 'content', title: 'Content', of: [{type: 'block'}]},
  ],
})
