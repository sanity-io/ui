import {CodeBlockIcon} from 'part:@sanity/base/code-block-icon'

export const codeExampleField = {
  icon: CodeBlockIcon,
  type: 'object',
  name: 'codeExample',
  title: 'Code example',
  fields: [
    {
      type: 'string',
      name: 'caption',
      title: 'Caption',
    },
    {
      type: 'code',
      name: 'code',
      title: 'Code',
    },
    {
      type: 'code',
      name: 'hook',
      title: 'React hook code',
    },
  ],
  preview: {
    select: {
      title: 'caption',
    },
  },
}
