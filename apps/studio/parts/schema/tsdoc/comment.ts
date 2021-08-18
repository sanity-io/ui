export const tsdocComment = {
  type: 'object',
  name: 'tsdoc.docComment',
  title: 'TSDoc comment',
  fields: [
    {
      type: 'array',
      name: 'summary',
      title: 'Summary',
      of: [{type: 'block'}],
    },
    {
      type: 'tsdoc.remarksBlock',
      name: 'remarks',
      title: 'Remarks',
    },
    {
      type: 'array',
      name: 'seeBlocks',
      title: 'See',
      of: [{type: 'tsdoc.seeBlock'}],
    },
    {
      type: 'array',
      name: 'parameters',
      title: 'Parameters',
      of: [{type: 'tsdoc.paramBlock'}],
    },
    {
      type: 'tsdoc.returnsBlock',
      name: 'returns',
      title: 'Returns',
    },
    {
      type: 'array',
      name: 'exampleBlocks',
      title: 'Example blocks',
      of: [{type: 'tsdoc.exampleBlock'}],
    },
    {
      type: 'array',
      name: 'modifierTags',
      title: 'Modifier tags',
      of: [{type: 'tsdoc.modifierTag'}],
    },
  ],
  options: {
    collapsible: true,
  },
}
