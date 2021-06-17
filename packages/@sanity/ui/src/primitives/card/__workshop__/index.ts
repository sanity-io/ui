import {defineScope} from '@sanity/ui-workshop'

export default defineScope({
  name: 'primitives/card',
  title: 'Card',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: import('./selectableItemsStory'),
    },
  ],
})
