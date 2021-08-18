export const apiClass = {
  type: 'document',
  name: 'api.class',
  title: 'Class',
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
  ],

  readOnly: true,
}
