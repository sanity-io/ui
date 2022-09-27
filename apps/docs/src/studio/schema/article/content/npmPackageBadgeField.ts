import {defineArrayMember} from 'sanity'

export const npmPackageBadgeField = defineArrayMember({
  type: 'object',
  name: 'npmPackageBadge',
  title: 'NPM package badge',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Package name',
    },
  ],
})
