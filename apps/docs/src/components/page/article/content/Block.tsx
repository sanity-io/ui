'use client'

import {PortableTextBlockComponent} from '@portabletext/react'
import {LinkIcon} from '@sanity/icons'
import {unwrapData, WrappedValue} from '@sanity/react-loader/jsx'
import {Box, Heading} from '@sanity/ui'
import {useContext} from 'react'

import {blocksToText} from '@/lib/blocksToText'
import {SanityBlockValue} from '@/lib/sanity/types'

import {ArticleHeadingsContext} from '../ArticleHeadingsContext'
import {ListItem} from './ListItem'
import {Paragraph} from './Paragraph'

type BlockType = Omit<WrappedValue<SanityBlockValue>, 'level' | 'listItem'> & {
  _listItem?: 'bullet' | 'number'
  level?: number
  listItem?: 'bullet' | 'number'
}

export const Block: PortableTextBlockComponent = (props) => {
  const {children, value} = props
  const block = value as unknown as BlockType
  const style = unwrapData<string>(block.style)
  const headings = useContext(ArticleHeadingsContext)

  if (block._listItem) {
    return <ListItem>{children}</ListItem>
  }

  if (style === 'normal') {
    return <Paragraph>{children}</Paragraph>
  }

  if (style === 'h2') {
    const text = blocksToText([unwrapData(value as any) as unknown as SanityBlockValue])
    const heading = headings.find((t) => t.text === text)

    return (
      <Box marginTop={6} marginBottom={5} id={heading?.slug}>
        <Heading as="h2" size={[1, 1, 2]}>
          {children}
          {heading && (
            <>
              &nbsp;&nbsp;
              <a href={`#${heading.slug}`}>
                <LinkIcon />
              </a>
            </>
          )}
        </Heading>
      </Box>
    )
  }

  if (style === 'h3') {
    const text = blocksToText([unwrapData(value as any) as unknown as SanityBlockValue])
    const heading = headings.find((t) => t.text === text)

    return (
      <Box marginTop={6} marginBottom={4} id={heading?.slug}>
        <Heading as="h3" size={1}>
          {children}
          {heading && (
            <>
              &nbsp;&nbsp;
              <a href={`#${heading.slug}`}>
                <LinkIcon />
              </a>
            </>
          )}
        </Heading>
      </Box>
    )
  }

  return (
    <div>
      [{style}] {children}
    </div>
  )
}
