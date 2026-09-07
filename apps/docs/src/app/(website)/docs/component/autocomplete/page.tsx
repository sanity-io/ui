import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2} from '@/components/page/article/content/headings'
import {Paragraph} from '@/components/page/article/content/Paragraph'
import {PropertyTable} from '@/components/page/article/content/PropertyTable'
import {PlainContent, PlainParagraph} from '@/components/page/article/PlainContent'

export const metadata: Metadata = {
  title: 'Autocomplete | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Autocomplete',
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
      title="Autocomplete"
      isComponent
      headings={[
        {level: 2, slug: 'properties', text: 'Properties'},
        {level: 2, slug: 'example-with-custom-rendering', text: 'Example with custom rendering'},
      ]}
    >
      <Paragraph>
        {'The '}
        <code>{'<Autocomplete />'}</code>
        {
          ' component is typically used for search components. It consists of a text input for writing a query, and properties for rendering 	suggestions.'
        }
      </Paragraph>

      <CodeExampleBlock
        title="Basic Autocomplete example"
        description="A basic example of using the Autocomplete component in Sanity UI."
        code={`<Card padding={4} paddingBottom={[7, 7, 8]}>
  <Autocomplete
    fontSize={[2, 2, 3]}
    icon={SearchIcon}
    id="autocomplete-example"
    options={[
      {value: 'foo'},
      {value: 'bar'},
      {value: 'baz'},
    ]}
    placeholder="Search options"
  />
</Card>`}
      />

      <Heading2 id="properties">Properties</Heading2>

      <PropertyTable
        properties={[
          {name: 'border', type: 'boolean'},
          {name: 'filterOption', type: '(query: string, option: Option) => boolean'},
          {name: 'fontSize', type: 'number | number[]'},
          {name: 'icon', type: 'React.ComponentType | React.ReactNode'},
          {name: 'id', type: 'string', required: true},
          {name: 'loading', type: 'boolean'},
          {name: 'onChange', type: '(value: string) => void', required: false},
          {name: 'onQueryChange', type: '(query: string | null) => void'},
          {name: 'onSelect', type: '(value: string) => void', required: false},
          {
            name: 'options',
            type: '{value: string}[]',
            required: true,
            description: (
              <PlainContent>
                <PlainParagraph>The options to render.</PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'padding', type: 'number | number[]'},
          {name: 'placeholder', type: 'string', required: false},
          {name: 'prefix', type: 'React.ReactNode'},
          {name: 'radius', type: 'number | number[]'},
          {
            name: 'renderOption',
            type: '(option: {value: string}) => React.ReactNode',
            required: true,
            description: (
              <PlainContent>
                <PlainParagraph>The callback function for rendering each option.</PlainParagraph>
              </PlainContent>
            ),
          },
          {name: 'renderValue', type: '(value: string, option?: Option) => string'},
          {name: 'suffix', type: 'React.ReactNode'},
          {
            name: 'value',
            type: 'string',
            required: false,
            description: (
              <PlainContent>
                <PlainParagraph>The current value.</PlainParagraph>
              </PlainContent>
            ),
          },
        ]}
      />

      <Heading2 id="example-with-custom-rendering">Example with custom rendering</Heading2>

      <CodeExampleBlock
        title="Autocomplete with custom rendering"
        code={`<Card padding={[3, 3, 4]} paddingBottom={[8, 8, 9]}>
  <Autocomplete
    // custom search filter
    filterOption={(query, option) =>
      option.payload.name
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1
    }
    fontSize={[2, 2, 3]}
    icon={SearchIcon}
    openButton
    // options with \`payload\`
    options={[
      {
        value: 'mikolajdobrucki',
        payload: {
          color: 'purple',
          userId: 'mikolajdobrucki',
          name: 'Mikołaj Dobrucki',
          imageUrl:
            'https://avatars.githubusercontent.com/u/5467602?v=4',
        },
      },
      {
        value: 'mariuslundgard',
        payload: {
          color: 'blue',
          userId: 'mariuslundgard',
          name: 'Marius Lundgård',
          imageUrl:
            'https://avatars.githubusercontent.com/u/406933?v=4',
        },
      },
      {
        value: 'vicbergquist',
        payload: {
          color: 'cyan',
          userId: 'vicbergquist',
          name: 'Victoria Bergquist',
          imageUrl:
            'https://avatars.githubusercontent.com/u/25737281?v=4',
        },
      },
    ]}
    padding={[3, 3, 4]}
    placeholder="Type to find user …"
    // custom option render function
    renderOption={(option) => (
      <Card as="button">
        <Flex align="center">
          <Box padding={1}>
            <Avatar
              color={option.payload.color}
              size={1}
              src={option.payload.imageUrl}
            />
          </Box>
          <Box flex={1} padding={2} paddingLeft={1}>
            <Text size={[2, 2, 3]}>
              {option.payload.name}
            </Text>
          </Box>
        </Flex>
      </Card>
    )}
    // custom value render function
    renderValue={(value, option) =>
      option?.payload.name || value
    }
  />
</Card>`}
      />
    </Article>
  )
}
