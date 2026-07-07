'use client'

import {Box, Stack, Text} from '@sanity/ui'
import {ReactElement} from 'react'

import {HeadingNode} from './getToc'

export function HeadingsNav({
  headings,
  space = 4,
}: {
  headings: HeadingNode[]
  space?: number
}): ReactElement {
  return (
    <Stack space={space}>
      {headings.map((heading) => (
        <Box key={heading.slug}>
          <Text size={1}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </Text>

          {heading.level < 3 && heading.children.length > 0 && (
            <Box marginTop={4} paddingLeft={2}>
              <HeadingsNav headings={heading.children} space={Math.max(heading.level + 2 - 1, 3)} />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
