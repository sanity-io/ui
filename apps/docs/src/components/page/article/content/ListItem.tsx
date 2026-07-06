import {Text} from '@sanity/ui'
import {ReactElement, ReactNode} from 'react'

export function ListItem(props: {children?: ReactNode}): ReactElement {
  const {children} = props

  return (
    <Text muted size={[2, 2, 3]}>
      {children}
    </Text>
  )
}
