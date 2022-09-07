import {Badge, Box, Card, Code, Flex, Heading, Inline, Label, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import {CommentExampleBlocks, CommentRemarks, CommentSummary} from '../comment'
import {TokenPreview} from '../tokenPreview'
import {useApp} from '$components/app'

export function ReferenceInterfaceMember(props: any) {
  const {data} = props
  const {comment} = data
  const {params} = useApp()

  const badges: any[] = [
    !data.optional && {
      text: 'Required',
      tone: 'critical',
    },
    data.releaseTag === 'beta' && {
      text: 'Beta',
      tone: 'caution',
    },
  ].filter(Boolean)

  return (
    <>
      <Flex align="center" marginY={[4, 4, 5]}>
        <Heading as="h3" size={[0, 0, 1, 2]}>
          <code>{data.name}</code>
        </Heading>

        {badges.length > 0 && (
          <Box marginLeft={2} style={{lineHeight: 0}}>
            <Inline space={2}>
              {badges.map((badge, badgeIndex) => (
                <Badge
                  fontSize={[1, 1, 2]}
                  key={badgeIndex}
                  tone={badge.tone}
                  style={{margin: '-6px 0'}}
                >
                  {badge.text}
                </Badge>
              ))}
            </Inline>
          </Box>
        )}
      </Flex>

      {data.inheritedFrom && (
        <Box marginY={[4, 4, 5]}>
          <Text as="p" muted size={[1, 1, 2]}>
            Inherited from{' '}
            {data.inheritedFrom.slug && (
              <code>
                <Link
                  href={`/reference/${params.name}/${params.version}/${data.inheritedFrom.slug?.current}`}
                >
                  <a>{data.inheritedFrom.name}</a>
                </Link>
              </code>
            )}
            {!data.inheritedFrom.slug && <code>{data.inheritedFrom.name}</code>}.
          </Text>
        </Box>
      )}

      <CommentSummary data={comment} />

      {data.type && (
        <Stack marginY={[4, 4, 5]} space={3}>
          <Label>Type</Label>

          <Card overflow="auto" padding={4} radius={2} shadow={1}>
            <Code muted>
              {data.type.map((t: any) => (
                <TokenPreview key={t._key} token={t} />
              ))}
            </Code>
          </Card>
        </Stack>
      )}

      <CommentRemarks data={comment} />
      <CommentExampleBlocks data={comment} level={4} />
    </>
  )
}
