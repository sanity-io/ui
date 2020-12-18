import {codeExampleField} from './codeExampleField'
import {npmPackageBadgeField} from './npmPackageBadgeField'
import {propertyTableField} from './propertyTableField'

const codeField = {
  type: 'code',
  name: 'code',
  title: 'Code',
}

const colorGridField = {
  type: 'object',
  name: 'content.colorGrid',
  title: 'Color grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

const sanityLogoGridField = {
  type: 'object',
  name: 'content.sanityLogoGrid',
  title: 'Sanity logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

const groqLogoGridField = {
  type: 'object',
  name: 'content.groqLogoGrid',
  title: 'GROQ logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

const imageField = {
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text (for screen readers)',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true,
      },
    },
  ],
  options: {
    hotspot: true,
  },
}

export const contentField = {
  type: 'array',
  name: 'content',
  title: 'Content',
  of: [
    {type: 'block'},
    codeField,
    codeExampleField,
    npmPackageBadgeField,
    propertyTableField,
    colorGridField,
    sanityLogoGridField,
    groqLogoGridField,
    imageField,
  ],
}
