import {defineScope} from '@sanity/ui-workshop'

function ExampleComponent() {
  return <div>Test Component</div>
}

export default defineScope({
  name: 'example',
  title: 'Example',
  stories: [
    {
      name: 'default',
      title: 'Default Story',
      component: ExampleComponent,
    },
  ],
})
