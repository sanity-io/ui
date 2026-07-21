'use client'

import {LinkIcon} from '@sanity/icons'
import {Box, Heading} from '@sanity/ui'
import {PortableTextBlockComponent, stegaClean} from 'next-sanity'
import {useContext} from 'react'

import {blocksToText} from '@/lib/blocksToText'
import {SanityBlockValue} from '@/lib/sanity/types'

import {ArticleHeadingsContext} from '../ArticleHeadingsContext'
import {Paragraph} from './Paragraph'

export const Block: PortableTextBlockComponent = (props) => {
  const {children, value} = props
  const block = value as unknown as SanityBlockValue
  const style = stegaClean(block.style)
  const headings = useContext(ArticleHeadingsContext)

  if (style === 'normal') {
    return <Paragraph>{children}</Paragraph>
  }

  if (style === 'h2') {
    const text = blocksToText([stegaClean(block)])
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
    const text = blocksToText([stegaClean(block)])
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
