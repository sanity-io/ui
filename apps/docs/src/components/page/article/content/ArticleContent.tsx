import {PortableText, PortableTextReactComponents} from '@portabletext/react'
import {GroqLogo, GroqMonogram, SanityLogo, SanityMonogram} from '@sanity/logos'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {ReactElement} from 'react'
import styled from 'styled-components'

import {
  ArticleData,
  CalloutData,
  CodeData,
  CodeExampleData,
  FigmaButtonData,
  FigmaEmbedData,
  ImageData,
  NpmPackageBadgeData,
  PropertyTableData,
} from '@/lib/data'

import {HeadingType} from '../getHeadings'
import {Block} from './Block'
import {Callout} from './Callout'
import {CodeBlock} from './CodeBlock'
import {CodeExampleBlock} from './CodeExampleBlock'
import {ColorGrid} from './ColorGrid'
import {FigmaButton} from './FigmaButton'
import {FigmaEmbed} from './FigmaEmbed'
import {Image} from './Image'
import {LogoGrid} from './LogoGrid'
import {NpmPackageBadge} from './NpmPackageBadge'
import {PropertyTable} from './PropertyTable'
import {Span} from './Span'

const Root = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
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

const components: Partial<PortableTextReactComponents> = {
  block: Block,

  types: {
    callout: ({value}) => <Callout data={value as WrappedValue<CalloutData>} />,
    code: ({value}) => <CodeBlock data={value as WrappedValue<CodeData>} />,
    codeExample: ({value}) => <CodeExampleBlock data={value as WrappedValue<CodeExampleData>} />,
    'content.groqLogoGrid': () => <LogoGrid logos={groqLogos} />,
    'content.sanityLogoGrid': () => <LogoGrid logos={sanityLogos} />,
    'content.colorGrid': () => <ColorGrid />,
    'content.figmaEmbed': ({value}) => <FigmaEmbed data={value as WrappedValue<FigmaEmbedData>} />,
    'content.figmaButton': ({value}) => (
      <FigmaButton data={value as WrappedValue<FigmaButtonData>} />
    ),
    image: ({value}) => <Image data={value as WrappedValue<ImageData>} />,
    npmPackageBadge: ({value}) => (
      <NpmPackageBadge data={value as WrappedValue<NpmPackageBadgeData>} />
    ),
    propertyTable: ({value}) => <PropertyTable data={value as WrappedValue<PropertyTableData>} />,
    span: Span,
  },
}

export function ArticleContent(props: {
  content: WrappedValue<NonNullable<ArticleData['content']>>
  headings: HeadingType[]
}): ReactElement {
  /**
   * HACK: Returns all content with `markDefs` attached to each block child.
   *
   * This is done as <PortableText /> receives 'wrapped' data and in turn will render custom
   * `<Span>` components defined in `components.types`.
   *
   * Whilst this span component is required for _Presentation_ overlays, it only has access
   * to the child value and NOT mark definitions (needed for custom annotations such as links).
   * Attaching `markDefs` to each child allows the span component to access these, albeit in
   * a hacky way.
   *
   * Ideally, `react-portabletext` would support receiving `wrapped` data and allow definition
   * of custom mark components via `components.marks`.
   */
  const contentWithChildMarkDefs = props.content.reduce<any[]>((acc, val) => {
    const blockChildren =
      val._type === 'block'
        ? val.children?.map((child) => {
            return {...child, markDefs: val?.markDefs}
          })
        : null

    acc.push({...val, children: blockChildren})
    return acc
  }, [])

  return (
    <Root>
      <PortableText components={components} value={contentWithChildMarkDefs} />
    </Root>
  )
}
