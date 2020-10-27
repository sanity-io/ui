export const propertyField = {
  type: 'object',
  name: 'property',
  title: 'Property',
  fields: [
    {type: 'string', name: 'name', title: 'Name'},
    {type: 'string', name: 'type', title: 'Type (TS)'},
    {type: 'boolean', name: 'required', title: 'Required'},
    {type: 'array', name: 'description', title: 'Description', of: [{type: 'block'}]},
  ],
}

export const propertyTableField = {
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
}
