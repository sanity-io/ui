import type {Metadata} from 'next'

import {Article} from '@/components/page/article/Article'
import {CodeExampleBlock} from '@/components/page/article/content/CodeExampleBlock'
import {Heading2, Heading3} from '@/components/page/article/content/headings'
import {BulletList, ListItem} from '@/components/page/article/content/lists'
import {Paragraph} from '@/components/page/article/content/Paragraph'

export const metadata: Metadata = {
  title: 'Why Sanity UI? | Sanity UI',
  description: 'An ergonomic toolkit to design with code.',
  openGraph: {
    type: 'website',
    title: 'Why Sanity UI?',
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
      title="Why Sanity UI?"
      headings={[
        {level: 2, slug: 'built-for-composition', text: 'Built for composition'},
        {level: 3, slug: 'typographic-primitives', text: 'Typographic primitives'},
        {level: 3, slug: 'layout-primitives', text: 'Layout primitives'},
        {level: 3, slug: 'interactive-primitives', text: 'Interactive primitives'},
        {level: 3, slug: 'other-primitives', text: 'Other primitives'},
        {level: 2, slug: 'accessibility-as-constraint', text: 'Accessibility as constraint'},
        {level: 3, slug: 'carefully-designed-focus-rings', text: 'Carefully designed focus rings'},
        {level: 3, slug: 'keyboard-navigation', text: 'Keyboard navigation'},
        {level: 3, slug: 'accessible-components', text: 'Accessible components'},
        {level: 2, slug: 'theming-with-java-script', text: 'Theming with JavaScript'},
        {level: 2, slug: 'type-script-support', text: 'TypeScript support'},
        {level: 2, slug: 'enables-pixel-perfection', text: 'Enables pixel-perfection'},
        {level: 2, slug: 'e2-e-testing', text: 'E2E testing'},
      ]}
    >
      <Paragraph>
        {'There are '}
        <strong>tons</strong>
        {
          ' of React UI libraries out there. So why did we build a new one, and why should you care?'
        }
      </Paragraph>

      <Heading2 id="built-for-composition">Built for composition</Heading2>

      <Paragraph>
        Sanity UI consists mainly of a set of UI primitives. The purpose of these primitives is to
        provide designers and developers with a set of simple, ergonomic and highly composable
        building blocks – so they can build more and worry less.
      </Paragraph>

      <Heading3 id="typographic-primitives">Typographic primitives</Heading3>

      <Paragraph>
        There are four typographic primitives in Sanity UI. These primitives share many
        capabilities, although – as their naming and visual treatment suggests – they are intended
        for different purposes.
      </Paragraph>

      <CodeExampleBlock
        title="Typographic primitives"
        code={`<Card padding={4}>
  <Stack gap={3}>
    <Text>Text</Text>
    <Code>Code</Code>
    <Heading>Heading</Heading>
    <Label>Label</Label>
  </Stack>
</Card>`}
      />

      <Heading3 id="layout-primitives">Layout primitives</Heading3>

      <Paragraph>
        {'Sanity UI features a set of basic building blocks for creating layouts: '}
        <code>Box</code>
        {', '}
        <code>Container</code>
        {', '}
        <code>Grid</code>
        {', '}
        <code>Flex</code>
        {', '}
        <code>Inline</code>
        {' and '}
        <code>Stack</code>.
      </Paragraph>

      <Heading3 id="interactive-primitives">Interactive primitives</Heading3>

      <Paragraph>
        {
          "Most apps needs some degree of input and interactive elements (especially so at Sanity). That's why Sanity UI has basic interactive primitives built-in: "
        }
        <code>Button</code>
        {', '}
        <code>Checkbox</code>
        {', '}
        <code>Radio</code>
        {', '}
        <code>Select</code>
        {', '}
        <code>Switch</code>
        {', '}
        <code>TextArea</code>
        {' and '}
        <code>TextInput</code>.
      </Paragraph>

      <Heading3 id="other-primitives">Other primitives</Heading3>

      <Paragraph>
        {'Sanity UI also comes with various other elements, such as '}
        <code>Avatar</code>
        {', '}
        <code>Badge</code>
        {', '}
        <code>KBD</code>
        {', '}
        <code>Popover</code>
        {', '}
        <code>Spinner</code>
        {' and '}
        <code>Tooltip</code>.
      </Paragraph>

      <Heading2 id="accessibility-as-constraint">Accessibility as constraint</Heading2>

      <Paragraph>
        {
          'Instead of visual design working against accessibility, Sanity UI is shaped with accessibility as a design constraint. '
        }
      </Paragraph>

      <Heading3 id="carefully-designed-focus-rings">Carefully designed focus rings</Heading3>

      <Paragraph>
        Focus rings are helpful for all people, whether you use the keyboard or not. Sanity UI even
        has theming configuration specifically for focus rings.
      </Paragraph>

      <Heading3 id="keyboard-navigation">Keyboard navigation</Heading3>

      <Paragraph>
        Keyboard navigation is another aspect that’s useful whether you have visual impairment or
        not. It enables both expert users to be even more effective, as well as people who cannot
        use the mouse.
      </Paragraph>

      <Heading3 id="accessible-components">Accessible components</Heading3>

      <BulletList>
        <ListItem>
          {'Accessible '}
          <code>Dialog</code>
          {' (follows '}
          <a
            href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html"
            target="_blank"
            rel="noindex nofollow"
          >
            WAI-ARIA design pattern
          </a>
          )
        </ListItem>
        <ListItem>
          {'Accessible '}
          <code>MenuButton</code>
          {' (follows '}
          <a
            href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html"
            target="_blank"
            rel="noindex nofollow"
          >
            WAI-ARIA
          </a>
          )
        </ListItem>
        <ListItem>
          {'Accessible '}
          <code>Autocomplete</code>
          {' (based on best practices and tested using screen readers)'}
        </ListItem>
      </BulletList>

      <Heading2 id="theming-with-java-script">Theming with JavaScript</Heading2>

      <Paragraph>
        Sanity uses JavaScript for all things on the client side – schemas, configuration, plugins,
        apps. With Sanity UI, the interface is also completely defined in JavaScript (including
        theming and CSS).
      </Paragraph>

      <Heading2 id="type-script-support">TypeScript support</Heading2>

      <Paragraph>
        TypeScript adds safety and developer experience features like code hinting.
      </Paragraph>

      <Heading2 id="enables-pixel-perfection">Enables pixel-perfection</Heading2>

      <Paragraph>
        As a design system strictly based on constraints, scales and themeable values, Sanity UI
        provides a solid and nearly breakproof framework for implementing visual design.
      </Paragraph>

      <Heading2 id="e2-e-testing">E2E testing</Heading2>

      <Paragraph>
        {'Test coverage with '}
        <a href="https://www.cypress.io/" target="_blank" rel="noindex nofollow">
          Cypress
        </a>
        , to avoid regressions between releases.
      </Paragraph>

      <Paragraph></Paragraph>

      <Paragraph></Paragraph>
    </Article>
  )
}
