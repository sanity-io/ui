import {ReferenceInterfaceMember} from './interfaceMember'

export function ReferenceInterfaceMembers(props: any) {
  const {data} = props

  return (
    <>
      {data.map(
        (member: any) => member && <ReferenceInterfaceMember data={member} key={member._key} />
      )}
    </>
  )
}
