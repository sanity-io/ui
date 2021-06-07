export const tsdocParamBlock = {
  type: 'object',
  name: 'tsdoc.paramBlock',
  title: 'Param block',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Name',
    },
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
