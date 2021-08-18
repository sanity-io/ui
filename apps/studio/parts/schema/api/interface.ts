export const apiInterface = {
  type: 'document',
  name: 'api.interface',
  title: 'Interface',
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
      name: 'typeParameters',
      title: 'Type parameters',
      of: [
        {
          type: 'object',
          name: 'api.typeParameter',
          title: 'Type parameter',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Title',
            },
            {
              type: 'api.tokens',
              name: 'constraintType',
              title: 'Constraint',
            },
            {
              type: 'api.tokens',
              name: 'defaultType',
              title: 'Default type',
            },
          ],
        },
      ],
    },

    {
      type: 'array',
      name: 'members',
      title: 'Members',
      of: [
        {
          type: 'object',
          name: 'api.property',
          title: 'Property',
          fields: [
            {
              type: 'string',
              name: 'name',
              title: 'Name',
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
              type: 'api.tokens',
              name: 'type',
              title: 'Type',
            },

            {
              type: 'boolean',
              name: 'optional',
              title: 'Optional',
            },
          ],
        },
      ],
    },

    {
      type: 'array',
      name: 'extends',
      title: 'Extends',
      of: [
        {
          type: 'object',
          name: 'api.extend',
          title: 'Extend',
          fields: [
            {
              type: 'api.tokens',
              name: 'type',
              title: 'Type',
            },
          ],
          preview: {
            select: {
              type: 'type',
            },
            prepare({type}: {type: {text: string}[]}) {
              return {
                title: type.map((token) => token.text).join(''),
              }
            },
          },
        },
      ],
    },
  ],

  readOnly: true,
}
