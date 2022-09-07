import {useMemo} from 'react'
import {Comment} from '../components/comment'
import {ReferenceInterfaceMembers} from '../components/interface'
import {getInterfaceMembers} from '../components/interface/helpers'
import {ReferenceReferrers} from '../components/referrers'
import {ReleaseTag} from '../components/releaseTag'
import {H1, H2} from '$components/typography'

export function ReferenceInterfaceContent(props: {data: any}) {
  const {data} = props
  const members = useMemo(() => getInterfaceMembers(data), [data])

  return (
    <>
      <H1>
        <code>{data.name}</code>{' '}
        {data.releaseTag !== 'public' && <ReleaseTag tag={data.releaseTag} />}
      </H1>

      <ReferenceReferrers data={data} />

      {data.comment && <Comment comment={data.comment} />}

      <H2>Members</H2>

      <ReferenceInterfaceMembers data={members} />
    </>
  )
}
