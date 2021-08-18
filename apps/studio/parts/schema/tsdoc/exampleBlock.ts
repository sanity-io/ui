export const tsdocExampleBlock = {
  type: 'object',
  name: 'tsdoc.exampleBlock',
  title: 'Example block',
  fields: [
    {
      type: 'array',
      name: 'content',
      title: 'Content',
      of: [
        {
          type: 'block',
        },
        {
          type: 'code',
          name: 'code',
          title: 'Code',
        },
      ],
    },
  ],
}
