import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2, Heading3} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'

export const metadata: Metadata = {
  title: 'Tab | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Tab',
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
      title="Tab"
      isComponent
      headings={[
        {level: 2, slug: 'usage', text: 'Usage'},
        {level: 2, slug: 'tab', text: '<Tab />'},
        {level: 3, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'tab-list', text: '<TabList />'},
        {level: 3, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'tab-panel', text: '<TabPanel />'},
        {level: 3, slug: 'properties', text: 'Properties'},
      ]}
    >
      <Paragraph>
        {'Tabs is a classic UI navigation pattern for dividing related content and interactions. '}
      </Paragraph>

      <Paragraph>
        {'The usage of '}
        <code>aria</code>
        {
          ' attributes is important in order for people using screen readers to get a good experience. When using TypeScript, Sanity UI enforces the usage of the correct '
        }
        <code>aria</code>
        {' attributes.'}
      </Paragraph>

      <Heading2 id="usage">Usage</Heading2>

      <CodeExampleBlock
        title="Tabs example"
        description="A basic example of using the TabList, Tab and TabPanel components in Sanity UI."
        code={`<Card padding={4}>
  <TabList gap={2}>
    <Tab
      aria-controls="content-panel"
      icon={EditIcon}
      id="content-tab"
      label="Content"
      onClick={() => setId('content')}
      selected={id === 'content'}
      gap={2}
    />
    <Tab
      aria-controls="preview-panel"
      icon={id === 'preview' ? EyeOpenIcon : EyeClosedIcon}
      id="preview-tab"
      label="Preview"
      onClick={() => setId('preview')}
      selected={id === 'preview'}
      gap={2}
    />
  </TabList>

  <TabPanel
    aria-labelledby="content-tab"
    hidden={id !== 'content'}
    id="content-panel"
  >
    <Card border marginTop={2} padding={4} radius={2}>
      <Heading>Content</Heading>
    </Card>
  </TabPanel>

  <TabPanel
    aria-labelledby="preview-tab"
    hidden={id !== 'preview'}
    id="preview-panel"
  >
    <Card border marginTop={2} padding={4}>
      <Heading>Preview</Heading>
    </Card>
  </TabPanel>
</Card>`}
        hookCode={`const [id, setId] = useState('content')`}
      />

      <Heading2 id="tab">
        <code>{'<Tab />'}</code>
      </Heading2>

      <Heading3 id="properties">Properties</Heading3>

      <PropertyTable
        properties={[
          {name: 'aria-controls', type: 'string', required: true},
          {name: 'id', type: 'string', required: true},
          {name: 'icon', type: 'React.ComponentType | React.ReactNode'},
          {name: 'focused', type: 'boolean'},
          {name: 'label', type: 'React.ReactNode'},
          {name: 'selected', type: 'boolean'},
          {name: 'tone', type: "'default' | 'primary' | 'positive' | 'caution' | 'critical'"},
        ]}
      />

      <Heading2 id="tab-list">
        <code>{'<TabList />'}</code>
      </Heading2>

      <Heading3 id="properties">Properties</Heading3>

      <PropertyTable
        properties={[
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'children', type: 'React.ReactElement[]'},
          {name: 'gap', type: 'number | number[]'},
          {
            name: 'space',
            type: 'number | number[]',
            deprecated: 'Use gap instead. Will be removed in v4.',
          },
        ]}
      />

      <Heading2 id="tab-panel">
        <code>{'<TabPanel />'}</code>
      </Heading2>

      <Heading3 id="properties">Properties</Heading3>

      <PropertyTable
        properties={[
          {name: 'aria-labelledby', type: 'string', required: true},
          {name: 'as', type: 'React.ElementType | keyof JSX.IntrinsicElements'},
          {name: 'id', type: 'string', required: true},
        ]}
      />
    </Article>
  )
}
