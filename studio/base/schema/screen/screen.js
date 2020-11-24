const arcadeSection = {
  type: 'object',
  name: 'screenSection.arcade',
  title: 'Arcade',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

// const colorGridSection = {
//   type: 'object',
//   name: 'screenSection.colorGrid',
//   title: 'Color grid',
//   fields: [{type: 'boolean', name: 'test', title: 'Test'}],
// }

export const screenSections = [
  arcadeSection,
  // colorGridSection
]

export const screen = {
  type: 'document',
  name: 'screen',
  title: 'Screen',
  fields: [
    {type: 'string', name: 'title', title: 'Title'},
    {
      type: 'array',
      name: 'sections',
      title: 'Sections',
      of: [
        {type: 'screenSection.arcade'},
        // {type: 'screenSection.colorGrid'}
      ],
    },
  ],
}
