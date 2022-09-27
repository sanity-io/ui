import {PortableTextTypeComponent} from '@portabletext/react'
import {sanity, unwrapData} from '@sanity/react-loader/jsx'

export const Span: PortableTextTypeComponent = (props) => {
  // return props.value.text.value

  const marks = unwrapData(props.value.marks) as string[]

  let node = <sanity.span>{props.value.text}</sanity.span>

  if (marks.includes('italic')) {
    node = <em>{node}</em>
  }

  if (marks.includes('strong')) {
    node = <strong>{node}</strong>
  }

  if (marks.includes('code')) {
    node = <code>{node}</code>
  }

  return node
}
