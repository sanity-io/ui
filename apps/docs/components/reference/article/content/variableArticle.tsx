import Link from 'next/link'
import {useMemo} from 'react'
import {
  CommentDeprecatedCallout,
  CommentExampleBlocks,
  CommentRemarks,
  CommentSummary,
} from '../components/comment'
import {ReferenceInterfaceMembers} from '../components/interface'
import {getInterfaceMembers} from '../components/interface/helpers'
import {ReleaseTag} from '../components/releaseTag'
import {TokensCodeBlock} from '../components/tokensCodeBlock'
import {useApp} from '$components/app'
import {H1, H2, P} from '$components/typography'

export function ReferenceVariableContent(props: {data: any}) {
  const {data} = props
  const {comment, propsType} = data
  const {params} = useApp()
  const propsTypeMembers = useMemo(() => propsType && getInterfaceMembers(propsType), [propsType])

  return (
    <>
      <H1>
        <code>{data.name}</code>{' '}
        {data.releaseTag !== 'public' && <ReleaseTag tag={data.releaseTag} />}
      </H1>

      <CommentDeprecatedCallout data={comment} />
      <CommentSummary data={comment} />
      <CommentRemarks data={comment} />

      {propsType && propsTypeMembers && (
        <>
          <H2>Props</H2>
          <P>
            Defined by the{' '}
            <code>
              <Link href={`/reference/${params.name}/${params.version}/${propsType.slug?.current}`}>
                <a>{propsType.name}</a>
              </Link>
            </code>{' '}
            interface .
          </P>

          {propsTypeMembers.length > 0 && <ReferenceInterfaceMembers data={propsTypeMembers} />}

          {propsTypeMembers.length === 0 && (
            <P>
              <em>No members.</em>
            </P>
          )}
        </>
      )}

      {!data.propsType && data.type && (
        <TokensCodeBlock data={data.type} label="Type" prefix={`const ${data.name}: `} />
      )}

      <CommentExampleBlocks data={comment} />

      {/* <Card marginY={[4, 4, 5]} overflow="auto" padding={4} radius={2} shadow={1}>
        <Code language="json">{JSON.stringify(data.comment, null, 2)}</Code>
      </Card> */}
    </>
  )
}
