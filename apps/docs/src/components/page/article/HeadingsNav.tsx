'use client'

import {Box, Stack, Text} from '@sanity/ui'
import {Space} from '@sanity/ui/tokens'
import {ReactElement} from 'react'

import {HeadingNode} from './getToc'

export function HeadingsNav({
  gap = 4,
  headings,
}: {
  headings: HeadingNode[]
  gap?: Space
}): ReactElement {
  return (
    <Stack gap={gap}>
      {headings.map((heading) => (
        <Box key={heading.slug}>
          <Text size={1}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </Text>

          {heading.level < 3 && heading.children.length > 0 && (
            <Box marginTop={4} paddingLeft={2}>
              <HeadingsNav
                headings={heading.children}
                gap={Math.max(heading.level + 2 - 1, 3) as Space}
              />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
