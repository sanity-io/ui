import {defineArrayMember} from 'sanity'

const propertyField = defineArrayMember({
  type: 'object',
  name: 'property',
  title: 'Property',
  fields: [
    {type: 'string', name: 'name', title: 'Name'},
    {type: 'string', name: 'type', title: 'Type (TS)'},
    {type: 'boolean', name: 'required', title: 'Required'},
    {
      type: 'string',
      name: 'deprecated',
      title: 'Deprecated (migration hint)',
      description:
        'When set, the property is rendered as deprecated. Use it for a short migration hint, e.g. "Use gap instead. Will be removed in v4."',
    },
    {type: 'array', name: 'description', title: 'Description', of: [{type: 'block'}]},
  ],
})

export const propertyTableField = defineArrayMember({
  type: 'object',
  name: 'propertyTable',
  title: 'Property table',
  fields: [
    {
      type: 'array',
      name: 'properties',
      title: 'Properties',
      of: [propertyField],
    },
    {
      type: 'string',
      name: 'caption',
      title: 'Caption',
    },
  ],
  preview: {
    select: {
      title: 'caption',
    },
  },
})
