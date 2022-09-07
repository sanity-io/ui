import {WarningOutlineIcon} from '@sanity/icons'
import {Box, Card, Flex, Text} from '@sanity/ui'
import {CommentContent} from './commentContent'
import {H} from '$components/typography'

export function Comment(props: any) {
  const {comment} = props

  return (
    <>
      <CommentDeprecatedCallout data={comment} />
      <CommentSummary data={comment} />
      <CommentRemarks data={comment} />
      <CommentExampleBlocks data={comment} />
    </>
  )
}

export function CommentDeprecatedCallout(props: any) {
  const {data = {}} = props
  const {deprecated} = data

  if (!deprecated?.content) return null

  return (
    <Card marginY={[4, 4, 5]} padding={[3, 3, 4]} radius={2} shadow={1} tone="critical">
      <Flex>
        <Box marginRight={[3, 3, 4]}>
          <Text size={[2, 2, 3]}>
            <WarningOutlineIcon />
          </Text>
        </Box>
        <Box flex={1}>
          <Box>
            <Text as="h2" size={[2, 2, 3]} weight="bold">
              This API is deprecated
            </Text>
          </Box>
          <CommentContent blocks={deprecated.content} />
        </Box>
      </Flex>
    </Card>
  )
}

export function CommentSummary(props: any) {
  const {data = {}} = props
  const {summary} = data

  if (!summary) return null

  return <CommentContent blocks={summary} />
}

export function CommentRemarks(props: any) {
  const {data = {}} = props
  const {remarks} = data

  if (!remarks?.content) return null

  return <CommentContent blocks={remarks.content} />
}

export function CommentExampleBlocks(props: any) {
  const {data = {}, level = 2} = props
  const {exampleBlocks} = data

  if (!exampleBlocks || exampleBlocks.length === 0) return null

  return (
    <>
      <H level={level}>Examples</H>

      {exampleBlocks.map((exampleBlock: any, idx: number) => (
        <CommentExampleBlock
          key={exampleBlock._key}
          level={level + 1}
          data={exampleBlock}
          index={idx}
        />
      ))}
    </>
  )
}

export function CommentExampleBlock(props: any) {
  const {data, index, level = 3} = props

  return (
    <>
      <H level={level}>Example {index + 1}</H>
      <CommentContent blocks={data.content} />
    </>
  )
}
