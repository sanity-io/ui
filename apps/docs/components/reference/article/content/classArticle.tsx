import {Badge, Heading} from '@sanity/ui'
import {
  CommentDeprecatedCallout,
  CommentExampleBlocks,
  CommentRemarks,
  CommentSummary,
} from '../components/comment'

export function ReferenceClassContent(props: {data: any}) {
  const {data} = props
  const {comment} = data

  return (
    <>
      <Heading as="h1" size={[2, 2, 3, 4]}>
        <code>{data.name}</code> {data.releaseTag === 'beta' && <Badge tone="caution">Beta</Badge>}
      </Heading>

      <CommentDeprecatedCallout data={comment} />
      <CommentSummary data={comment} />
      <CommentRemarks data={comment} />
      <CommentExampleBlocks data={comment} />
    </>
  )
}
