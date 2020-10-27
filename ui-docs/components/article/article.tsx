import {Box, Heading, Stack, Text} from '@sanity/ui'
import React from 'react'
import {getTOC} from './helpers'
import {ArticleContent, TimeAgo} from '~/components'

export function Article({article, slug}: {article?: any; slug: string}) {
  if (!article) {
    return (
      <Text>
        Missing article with slug <code>{slug}</code>!
      </Text>
    )
  }

  const toc = getTOC(article.content)

  return (
    <article>
      {article && (
        <Stack space={[4, 4, 5, 6]}>
          <Heading as="h1" size={[2, 2, 3, 4]}>
            {article.title}
          </Heading>

          {toc.length > 0 && (
            <Stack space={[2, 3, 4]}>
              {toc.map((heading) => (
                <Box key={heading.slug}>
                  <Text>
                    <a href={`#${heading.slug}`}>{heading.text}</a>
                  </Text>
                </Box>
              ))}
            </Stack>
          )}

          {article.content && <ArticleContent blocks={article.content} toc={toc} />}

          {article._updatedAt && (
            <Text muted size={[0, 1, 2]}>
              Updated <TimeAgo date={article._updatedAt} />
            </Text>
          )}
        </Stack>
      )}
    </article>
  )
}
