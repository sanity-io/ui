import {Box, Stack, Text} from '@sanity/ui'
import {HeadingNode} from '$lib/portable-text'

export function HeadingList({headings, space = 4}: {headings: HeadingNode[]; space?: number}) {
  return (
    <Stack space={space}>
      {headings.map((heading) => (
        <Box key={heading.slug}>
          <Text size={2 - (heading.level - 2)}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </Text>

          {heading.level < 3 && heading.children.length > 0 && (
            <Box marginTop={4} paddingLeft={2}>
              <HeadingList headings={heading.children} space={Math.max(heading.level + 2 - 1, 3)} />
            </Box>
          )}
        </Box>
      ))}
    </Stack>
  )
}
