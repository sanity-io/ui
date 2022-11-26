import {
  defineScope,
  useBoolean,
  useNumber,
  useSelect,
  useString,
  useText,
} from '@sanity/ui-workshop'

export default defineScope({
  name: 'test',
  title: 'Test',
  stories: [
    {
      name: 'test',
      title: 'Test',
      component: TestStory,
    },
  ],
})

const options = {
  None: '',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
}

function TestStory() {
  const text = useText('Text', 'Hello, world')
  const boolean = useBoolean('Boolean', true)
  const number = useNumber('Number', 1234)
  const string = useString('String', '...')
  const option = useSelect('Select option', options)

  return (
    <div>
      <h1>This is my first story.</h1>
      <p>Some text: {text}</p>
      <p>A boolean: {boolean ? 'true' : 'false'}</p>
      <p>A number: {number}</p>
      <p>A string: {string}</p>
      <p>An option: {option}</p>
    </div>
  )
}
