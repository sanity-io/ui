import {
  CommentDeprecatedCallout,
  CommentExampleBlocks,
  CommentRemarks,
  CommentSummary,
} from '../components/comment'
import {ReferenceReferrers} from '../components/referrers'
import {ReleaseTag} from '../components/releaseTag'
import {TokensCodeBlock} from '../components/tokensCodeBlock'
import {H1} from '$components/typography'

export function ReferenceTypeAliasContent(props: {data: any}) {
  const {data} = props
  const {comment} = data

  return (
    <>
      <H1>
        <code>{data.name}</code>{' '}
        {data.releaseTag !== 'public' && <ReleaseTag tag={data.releaseTag} />}
      </H1>

      <ReferenceReferrers data={data} />
      <CommentDeprecatedCallout data={comment} />
      <CommentSummary data={comment} />

      {data.type && (
        <TokensCodeBlock data={data.type} label="Type" prefix={`type ${data.name} = `} />
      )}

      <CommentRemarks data={comment} />
      <CommentExampleBlocks data={comment} />
    </>
  )
}
