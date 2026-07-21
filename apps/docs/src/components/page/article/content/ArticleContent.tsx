import {GroqLogo, GroqMonogram, SanityLogo, SanityMonogram} from '@sanity/logos'
import {Box} from '@sanity/ui'
import {PortableText, type InferStrictComponents} from 'next-sanity'
import {stegaClean} from 'next-sanity'
import {ReactElement} from 'react'
import {styled} from 'styled-components'

import type {PortableTextValue} from '@/types'

import {HeadingType} from '../getHeadings'
import {Block} from './Block'
import {Callout} from './Callout'
import {CodeBlock} from './CodeBlock'
import {CodeExampleBlock} from './CodeExampleBlock'
import {ColorGrid} from './ColorGrid'
import {FigmaButton} from './FigmaButton'
import {FigmaEmbed} from './FigmaEmbed'
import {Image} from './Image'
import {ListItem} from './ListItem'
import {LogoGrid} from './LogoGrid'
import {NpmPackageBadge} from './NpmPackageBadge'
import {PropertyTable} from './PropertyTable'

const Root = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`

const BulletList = styled(Box)`
  & > li [data-ui='Text'] > span:before {
    position: absolute;
    content: '•';
    width: 1em;
    margin-left: -1.5em;
    text-align: right;
  }
`

const NumberedList = styled(Box)`
  counter-reset: list;

  & > li {
    counter-increment: list;
  }

  & > li [data-ui='Text'] > span:before {
    position: absolute;
    content: counter(list) '.';
    width: 1em;
    margin-left: -1.5em;
    text-align: right;
  }
`

const groqLogos = [
  {name: 'GroqLogo', component: GroqLogo as any},
  {name: 'GroqMonogram', component: GroqMonogram},
]

const sanityLogos = [
  {name: 'SanityLogo', component: SanityLogo as any},
  {name: 'SanityMonogram', component: SanityMonogram as any},
]

const components = {
  block: Block,

  list: {
    bullet: ({children}) => (
      <BulletList forwardedAs="ul" marginY={[4, 4, 5]} paddingLeft={5}>
        {children}
      </BulletList>
    ),
    number: ({children}) => (
      <NumberedList forwardedAs="ol" marginY={[4, 4, 5]} paddingLeft={5}>
        {children}
      </NumberedList>
    ),
  },

  listItem: {
    bullet: ({children}) => (
      <Box as="li" marginY={[3, 3, 4]}>
        <ListItem>{children}</ListItem>
      </Box>
    ),
    number: ({children}) => (
      <Box as="li" marginY={[3, 3, 4]}>
        <ListItem>{children}</ListItem>
      </Box>
    ),
  },

  marks: {
    // // Internal links are not resolved to URLs (yet); render the plain text
    // internalLink: ({children}) => <>{children}</>,
    link: ({children, value}) => {
      const href = stegaClean(value?.href)
      const target = (href || '').startsWith('http') ? '_blank' : undefined

      return (
        <a href={href} target={target} rel={target === '_blank' ? 'noindex nofollow' : undefined}>
          {children}
        </a>
      )
    },
  },

  types: {
    'callout': ({value}) => <Callout data={value} />,
    'code': ({value}) => <CodeBlock data={value} />,
    'codeExample': ({value}) => <CodeExampleBlock data={value} />,
    'content.groqLogoGrid': () => <LogoGrid logos={groqLogos} />,
    'content.sanityLogoGrid': () => <LogoGrid logos={sanityLogos} />,
    'content.colorGrid': () => <ColorGrid />,
    'content.figmaEmbed': ({value}) => <FigmaEmbed data={value} />,
    'content.figmaButton': ({value}) => <FigmaButton data={value} />,
    'image': ({value}) => <Image data={value} />,
    'npmPackageBadge': ({value}) => <NpmPackageBadge data={value} />,
    'propertyTable': ({value}) => <PropertyTable data={value} />,
  },
} satisfies InferStrictComponents<PortableTextValue>

export function ArticleContent(props: {
  content: PortableTextValue
  headings: HeadingType[]
}): ReactElement {
  return (
    <Root>
      <PortableText components={components} value={props.content} />
    </Root>
  )
}
