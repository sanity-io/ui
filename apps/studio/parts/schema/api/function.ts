export const apiFunction = {
  type: 'document',
  name: 'api.function',
  title: 'Function',

  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },

    {
      type: 'slug',
      name: 'slug',
      title: 'Slug',
    },

    {
      type: 'reference',
      name: 'release',
      title: 'Release',
      to: [{type: 'api.release'}],
      weak: true,
    },

    {
      type: 'boolean',
      name: 'isReactComponentType',
      title: 'Is React component',
      options: {
        layout: 'checkbox',
      },
    },

    {
      type: 'tsdoc.docComment',
      name: 'comment',
      title: 'Comment',
    },

    {
      type: 'string',
      name: 'releaseTag',
      title: 'Release tag',
      options: {
        list: [
          {value: 'beta', title: 'Beta'},
          {value: 'public', title: 'Public'},
        ],
      },
    },

    {
      type: 'array',
      name: 'parameters',
      title: 'Parameters',
      of: [
        {
          type: 'object',
          name: 'api.functionParameter',
          title: 'Parameter',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
            },
            {
              type: 'api.tokens',
              name: 'type',
              title: 'Type',
            },
          ],
        },
      ],
    },

    {
      type: 'api.tokens',
      name: 'returnType',
      title: 'Return type',
    },
  ],

  readOnly: true,
}
