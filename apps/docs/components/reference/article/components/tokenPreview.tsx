import {Box, Code, Container, Tooltip} from '@sanity/ui'
import Link from 'next/link'
import styled from 'styled-components'
import {CommentSummary} from './comment'
import {useApp} from '$components/app'

const CommentBox = styled(Box)`
  border-top: 1px solid var(--card-border-color);

  & > *:first-child {
    margin-top: 0 !important;
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
`

export function TokenPreview({token}: any) {
  const {params} = useApp()

  if (token.reference?._id) {
    return (
      <Tooltip content={<ReferenceTooltipContent data={token.reference} />} placement="top" portal>
        <span>
          <Link href={`/reference/${params.name}/${params.version}/${token.reference.name}`}>
            <a>{token.reference.name}</a>
          </Link>
        </span>
      </Tooltip>
    )
  }

  return <>{token.text}</>
}

function ReferenceTooltipContent(props: any) {
  const {data} = props

  if (data._type === 'api.typeAlias') {
    return (
      <Container width={1}>
        <Box padding={4} overflow="auto">
          <Code language="typescript">
            {[`type ${data.name} = `, data.type.map((t: any) => t.text).join('')].join('')}
          </Code>
        </Box>
        {data.comment?.summary && (
          <CommentBox padding={4}>
            <CommentSummary data={data.comment} />
          </CommentBox>
        )}
      </Container>
    )
  }

  return (
    <Box padding={2}>
      <Code>type</Code>
    </Box>
  )
}
