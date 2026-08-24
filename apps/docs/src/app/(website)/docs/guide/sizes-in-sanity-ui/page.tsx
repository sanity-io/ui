import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeBlock} from '@/components/page/article/content/CodeBlock'
import {ContentImage} from '@/components/page/article/content/ContentImage'
import {Heading2} from '@/components/page/article/content/headings'
import {BulletList, ListItem} from '@/components/page/article/content/lists'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Sizes in Sanity UI | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Sizes in Sanity UI',
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
      title="Sizes in Sanity UI"
      headings={[
        {
          level: 2,
          slug: 'why-does-sanity-ui-use-a-number-based-spacing-scale',
          text: 'Why does Sanity UI use a number-based spacing scale?',
        },
        {level: 2, slug: 'what-do-the-numbers-mean', text: 'What do the numbers mean?'},
        {level: 2, slug: 'vertical-rhythm', text: 'Vertical rhythm'},
        {
          level: 2,
          slug: 'other-projects-using-number-based-spacing-scales',
          text: 'Other projects using number-based spacing scales',
        },
      ]}
    >
      <Heading2 id="why-does-sanity-ui-use-a-number-based-spacing-scale">
        Why does Sanity UI use a number-based spacing scale?
      </Heading2>

      <Paragraph>
        {'Some UI libraries use spacing keys like '}
        <code>none</code>
        {', '}
        <code>xs</code>
        {', '}
        <code>s</code>
        {', '}
        <code>m</code>
        {', '}
        <code>l</code>
        {' , '}
        <code>xl</code>, etc., while Sanity UI uses numeric spacing keys.
      </Paragraph>

      <Paragraph>
        {'For example – this is how you define the spacing/size of a button in '}
        <a
          href="https://v2.chakra-ui.com/docs/components/button"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Chakra UI
        </a>
        :
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`<Button colorScheme='teal' size='sm'>
  Button
</Button>`}
      />

      <Paragraph>While in Sanity UI you do:</Paragraph>

      <CodeBlock language="tsx" code={`<Button padding={2} tone="primary" text="Button" />`} />

      <Paragraph>These are some advantages of number-based spacing scales:</Paragraph>

      <BulletList>
        <ListItem>Simpler to learn.</ListItem>
        <ListItem>Shorter keys, faster to use.</ListItem>
        <ListItem>
          {'Enables arithmetic like '}
          <code>{'padding={paddingProp - 1}'}</code>
        </ListItem>
        <ListItem>
          {'Enables negative spacing like '}
          <code>{'margin={-4}'}</code>
        </ListItem>
      </BulletList>

      <Heading2 id="what-do-the-numbers-mean">What do the numbers mean?</Heading2>

      <Paragraph>
        {'The numbers are part of a '}
        <em>spacing scale</em>.
      </Paragraph>

      <Paragraph>
        The spacing scale in Sanity UI is a sequence of 10 numbers – 0 to 9. Each number represent a
        spacing value:
      </Paragraph>

      <BulletList>
        <ListItem>
          <code>0 = 0px</code>
        </ListItem>
        <ListItem>
          <code>1 = 4px</code>
        </ListItem>
        <ListItem>
          <code>2 = 8px</code>
        </ListItem>
        <ListItem>
          <code>3 = 12px</code>
        </ListItem>
        <ListItem>
          <code>4 = 20px</code>
        </ListItem>
        <ListItem>
          <code>5 = 32px</code>
        </ListItem>
        <ListItem>
          <code>6 = 52px</code>
        </ListItem>
        <ListItem>
          <code>7 = 84px</code>
        </ListItem>
        <ListItem>
          <code>8 = 136px</code>
        </ListItem>
        <ListItem>
          <code>9 = 220px</code>
        </ListItem>
      </BulletList>

      <Paragraph>
        Using a fibonacci scale gives us an effective scale for combining different paddings and get
        balanced and aligned compositions.
      </Paragraph>

      <ContentImage src="/images/sizes-in-sanity-ui-25.png" alt="The Fibonacci scale" />

      <Paragraph>Which means:</Paragraph>

      <CodeBlock
        language="tsx"
        code={`<Card padding={0}> // no padding
<Card padding={1}> // 4px padding
<Card padding={4}> // 20px padding
<Card padding={6}> // 52px padding`}
      />

      <Paragraph>and so on.</Paragraph>

      <Heading2 id="vertical-rhythm">Vertical rhythm</Heading2>

      <Paragraph>
        {
          'Consistent vertical spacing between elements is the foundation of a readable layout. Use the '
        }
        <code>Stack</code>
        {' component with the '}
        <code>gap</code>
        {' prop to place elements on top of each other with uniform spacing drawn from the spacing scale:'}
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`<Stack gap={3}>
  <Heading size={2}>Section title</Heading>
  <Text>Body text that follows the heading.</Text>
</Stack>`}
      />

      <Paragraph>
        {'Typographic components like '}
        <code>Text</code>
        {', '}
        <code>Heading</code>
        {', and '}
        <code>Label</code>
        {
          ' carry invisible vertical whitespace above the cap-height and below the baseline that line-height adds. This extra space can make gaps look uneven when you measure from the spacing scale alone.'
        }
      </Paragraph>

      <Paragraph>
        {'The '}
        <code>trim</code>
        {
          ' prop (available on all three components) removes that whitespace, so the rendered spacing matches the scale value exactly:'
        }
      </Paragraph>

      <CodeBlock
        language="tsx"
        code={`<Stack gap={3}>
  <Heading size={2} trim={1}>Section title</Heading>
  <Text trim={1}>Body text that follows the heading.</Text>
</Stack>`}
      />

      <Paragraph>
        {'Use '}
        <code>{'trim={1}'}</code>
        {
          ' when text sits next to icons, when you need pixel-accurate alignment with other elements, or when the extra line-box whitespace makes the layout feel unbalanced.'
        }
      </Paragraph>

      <Heading2 id="other-projects-using-number-based-spacing-scales">
        Other projects using number-based spacing scales
      </Heading2>

      <BulletList>
        <ListItem>
          Material UI<em>{': '}</em>
          <a
            href="https://mui.com/system/spacing/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://mui.com/system/spacing/
          </a>
        </ListItem>
        <ListItem>
          {'Theme UI: '}
          <a href="https://theme-ui.com/" target="_blank" rel="nofollow noopener noreferrer">
            https://theme-ui.com/
          </a>
        </ListItem>
        <ListItem>
          {'Styled System: '}
          <a href="https://styled-system.com/" target="_blank" rel="nofollow noopener noreferrer">
            https://styled-system.com/
          </a>
        </ListItem>
        <ListItem>
          {'Braid: '}
          <a
            href="https://seek-oss.github.io/braid-design-system/"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            https://seek-oss.github.io/braid-design-system/
          </a>
        </ListItem>
      </BulletList>
    </Article>
  )
}
