export const apiType = {
  type: 'document',
  name: 'api.typeAlias',
  title: 'Type',
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
      type: 'api.tokens',
      name: 'type',
      title: 'Type',
    },
  ],

  readOnly: true,
}
