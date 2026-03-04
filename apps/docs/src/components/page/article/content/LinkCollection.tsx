import {Box, Card, Grid, Stack, Text} from '@sanity/ui'
import {LinkCollectionData} from '../../../../lib/data/article/types'
import {WrappedValue} from '@sanity/react-loader/jsx'
import {sanity} from '@sanity/react-loader/jsx'
import {VersionedLink} from '../../../VersionedLink'
import {PlainContent} from '../PlainContent'

export function LinkCollection(props: {data: WrappedValue<LinkCollectionData>}) {
  const {links} = props.data

  if (!links || links.length === 0) {
    return null
  }

  return (
    <Grid gridTemplateColumns={[1, 2, 3, 3, 6]} gap={[3, 4, 4, 4]}>
      {links.map((link) => {
        return (
          <Card
            as={VersionedLink}
            href={link.href?.value ?? ''}
            key={link._key}
            overflow="hidden"
            radius={4}
            shadow={1}
            tone="neutral"
          >
            <Box
              muted
              style={{
                aspectRatio: '3/2',
              }}
            />

            <Stack gap={3} padding={4}>
              <Text as="h3" size={2} weight="medium">
                <sanity.span>{link.title}</sanity.span>
              </Text>

              <PlainContent
                blocks={
                  // TODO: wrapped portable text
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  link.description as any[]
                }
              />
            </Stack>
          </Card>
        )
      })}
    </Grid>
  )
}
