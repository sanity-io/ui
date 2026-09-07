import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Avatar | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Avatar',
    description: 'An ergonomic toolkit to design with code.',
    siteName: 'Sanity UI',
  },
  twitter: {
    card: 'summary',
    site: '@sanity_io',
  },
}

export default function Page() {
  return (
    <Article
      title="Avatar"
      isComponent
      headings={[
        {level: 2, slug: 'avatar-sizes', text: 'Avatar sizes'},
        {level: 2, slug: 'avatar-colors', text: 'Avatar colors'},
        {level: 2, slug: 'avatar-images', text: 'Avatar images'},
        {level: 2, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Paragraph>Avatars are used to represent people and other agents (e.g. bots).</Paragraph>

      <Heading2 id="avatar-sizes">Avatar sizes</Heading2>

      <Paragraph>
        {'The '}
        <code>Avatar</code>
        {' component’s '}
        <code>size</code>
        {' property can be set to either '}
        <code>0</code>
        {', '}
        <code>1</code>
        {' , '}
        <code>2</code>
        {' or '}
        <code>3</code>.
      </Paragraph>

      <CodeExampleBlock
        title="Avatar sizes"
        description="Example showing various sizes of the Avatar component."
        code={`<Card
  padding={4}
  style={{lineHeight: 0, textAlign: 'center'}}
>
  <Inline gap={3}>
    <Avatar size={0} />
    <Avatar size={1} />
    <Avatar size={2} />
    <Avatar size={3} />
  </Inline>
</Card>`}
      />

      <Heading2 id="avatar-colors">Avatar colors</Heading2>

      <Paragraph>
        {'The '}
        <code>Avatar</code>
        {' component’s color property can be set to either '}
        <code>blue</code>
        {', '}
        <code>purple</code>
        {', '}
        <code>magenta</code>
        {', '}
        <code>red</code>
        {', '}
        <code>orange</code>
        {', '}
        <code>yellow</code>
        {', '}
        <code>green</code>
        {', '}
        <code>cyan</code>
        {' or '}
        <code>gray</code>
        {' (default).'}
      </Paragraph>

      <CodeExampleBlock
        title="Avatar colors"
        description="Example showing the various colors of the Avatar component."
        code={`<Card
  padding={4}
  style={{lineHeight: 0, textAlign: 'center'}}
>
  <Inline gap={3}>
    <Avatar color="blue" />
    <Avatar color="purple" />
    <Avatar color="magenta" />
    <Avatar color="red" />
    <Avatar color="orange" />
    <Avatar color="yellow" />
    <Avatar color="green" />
    <Avatar color="cyan" />
    <Avatar />
  </Inline>
</Card>`}
      />

      <Heading2 id="avatar-images">Avatar images</Heading2>

      <Paragraph>
        {'The '}
        <code>Avatar</code>
        {' component takes a '}
        <code>src</code>
        {' property to render the avatar image.'}
      </Paragraph>

      <CodeExampleBlock
        title="Avatar with image"
        description="Example showing an image of a random face."
        code={`<Card padding={4}>
  <Flex justify="center">
    <Avatar
      alt="A random face"
      color="magenta"
      src="https://source.unsplash.com/96x96/?face"
      size={2}
    />
  </Flex>
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'animateArrowFrom', type: "'top' | 'bottom' | 'inside'"},
          {name: 'arrowPosition', type: "'top' | 'bottom' | 'inside'"},
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {
            name: 'color',
            type: "'gray' | 'blue' | 'purple' | 'magenta' | 'red' | 'orange' | 'yellow' | 'green' | 'cyan'",
          },
          {name: 'initials', type: 'string'},
          {name: 'onImageLoadError', type: '(event: Error) => void'},
          {name: 'size', type: '0 | 1 | 2 | 3 | Array<0 | 1 | 2 | 3>'},
          {name: 'src', type: 'string'},
          {name: 'status', type: "'online' | 'editing' | 'inactive'"},
          {name: 'title', type: 'string'},
        ]}
      />
    </Article>
  )
}
