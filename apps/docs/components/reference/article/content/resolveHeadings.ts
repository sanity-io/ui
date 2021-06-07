import {getInterfaceMembers} from '../components/interface/helpers'
import {HeadingType} from '$lib/portable-text'

export function getHeadings(data: any): HeadingType[] {
  const {comment} = data
  const headings: HeadingType[] = []

  if (data._type === 'api.interface') {
    const members = getInterfaceMembers(data)

    headings.push({
      level: 2,
      slug: 'members',
      text: 'Members',
    })

    for (const member of members) {
      headings.push({
        level: 3,
        slug: member.name,
        text: member.name,
      })
    }
  }

  if (data._type === 'api.variable' && data.isReactComponentType) {
    headings.push({
      level: 2,
      slug: 'props',
      text: 'Props',
    })

    if (data.propsType) {
      const members = getInterfaceMembers(data.propsType)

      for (const member of members) {
        headings.push({
          level: 3,
          slug: member.name,
          text: member.name,
        })
      }
    }

    if (comment?.exampleBlocks && comment.exampleBlocks.length > 0) {
      headings.push({
        level: 2,
        slug: 'examples',
        text: 'Examples',
      })

      for (let i = 0; i < data.comment.exampleBlocks.length; i += 1) {
        headings.push({
          level: 3,
          slug: `example-${i + 1}`,
          text: `Example ${i + 1}`,
        })
      }
    }
  }

  return headings
}
