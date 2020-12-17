const arcadeSection = {
  type: 'object',
  name: 'screenSection.arcade',
  title: 'Arcade',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
}

const linkType = {
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
      name: 'ctas',
      title: 'CTAs',
      of: [
        {
          type: 'object',
          name: 'cta',
          title: 'Call to action',
          fields: [
            {
              type: 'string',
              name: 'label',
              title: 'Label',
            },
            {
              type: 'string',
              name: 'href',
              title: 'Hypertext reference',
            },
            {
              type: 'string',
              name: 'tone',
              title: 'Tone',
              options: {
                list: ['default', 'primary'],
              },
            },
            {
              type: 'string',
              name: 'mode',
              title: 'Mode',
              options: {
                list: ['default', 'ghost'],
              },
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [linkType],
    },
    {
      type: 'object',
      name: 'backgroundImage',
      title: 'Image',
      fields: [
        {type: 'image', name: 'dark', title: 'Dark mode'},
        {type: 'image', name: 'light', title: 'Light mode'},
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
    {
      type: 'seo',
      name: 'seo',
      title: 'SEO',
    },
  ],
}
