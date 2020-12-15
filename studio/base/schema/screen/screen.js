const arcadeSection = {
  type: 'object',
  name: 'screenSection.arcade',
  title: 'Arcade',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

const heroSection = {
  type: 'object',
  name: 'screenSection.hero',
  title: 'Hero',
  fields: [
    {
      type: 'string',
      name: 'headline',
      title: 'Headline',
    },
    {
      type: 'string',
      name: 'copy',
      title: 'Copy',
    },
    {
      type: 'string',
      name: 'linksHeader',
      title: 'Links header',
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [
        {
          type: 'object',
          name: 'link',
          title: 'Link',
          fields: [
            {
              type: 'string',
              name: 'title',
              title: 'Title',
            },
            {
              type: 'text',
              name: 'subtitle',
              title: 'Subtitle',
            },
            {
              type: 'string',
              name: 'href',
              title: 'Hypertext reference',
            },
          ],
        },
      ],
    },
  ],
}

// const colorGridSection = {
//   type: 'object',
//   name: 'screenSection.colorGrid',
//   title: 'Color grid',
//   fields: [{type: 'boolean', name: 'test', title: 'Test'}],
// }

export const screenSections = [
  arcadeSection,
  heroSection,
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
        {type: 'screenSection.hero'},
        // {type: 'screenSection.colorGrid'}
      ],
    },
  ],
}
