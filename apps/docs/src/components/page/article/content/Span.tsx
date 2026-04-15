import {PortableTextTypeComponent} from '@portabletext/react'
import {sanity, unwrapData} from '@sanity/react-loader/jsx'
import {VersionedLink} from '../../../VersionedLink'
import {vars} from '@sanity/ui'

export const Span: PortableTextTypeComponent = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markDefs = props.value.markDefs as any[]
  const marks = unwrapData(props.value.marks) as string[]

  const node = marks.reduce(
    (acc, mark) => {
      switch (mark) {
        case 'code':
          acc = <code>{acc}</code>
          break
        case 'em':
          acc = <em>{acc}</em>
          break
        case 'strong':
          acc = <strong style={{fontWeight: vars.font.text.weight.semibold}}>{acc}</strong>
          break
        default:
          const markDef = markDefs.find((m) => m._key === mark)
          if (markDef?._type === 'link') {
            const target = (markDef?.href?.value || '').startsWith('http') ? '_blank' : undefined
            const href = markDef?.href?.value

            if (!href) {
              return acc
            }

            if (!target && href.startsWith('/')) {
              return (
                <VersionedLink href={href} target={target}>
                  {acc}
                </VersionedLink>
              )
            }

            return (
              <a
                href={href}
                target={target}
                rel={target === '_blank' ? 'noindex nofollow' : undefined}
              >
                {acc}
              </a>
            )
          }
          break
      }
      return acc
    },

    <sanity.span>{props.value.text}</sanity.span>,
  )
  return node
}
