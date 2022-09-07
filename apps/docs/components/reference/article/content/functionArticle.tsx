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

export function ReferenceFunctionContent(props: {data: any}) {
  const {data} = props
  const {comment, propsType} = data
  const {params} = useApp()
  const propsTypeMembers = useMemo(() => propsType && getInterfaceMembers(propsType), [propsType])
  const codePrefix = useMemo(
    () =>
      data.parameters &&
      `function ${data.name}(` +
        data.parameters
          .map((param: any) => {
            return `${param.name}: ${param.type.map((t: any) => t.text).join('')}`
          })
          .join(', ') +
        `): `,
    [data]
  )

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
              <Link href={`/release/${params.version}/${propsType.slug?.current}`}>
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

      {!data.propsType && data.returnType && (
        <TokensCodeBlock data={data.returnType} label="Type" prefix={codePrefix} />
      )}

      <CommentExampleBlocks data={comment} />
    </>
  )
}
