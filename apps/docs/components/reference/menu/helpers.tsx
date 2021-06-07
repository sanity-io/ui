import {BadgeTone} from '@sanity/ui'
import {NavMenu, NavMenuLink} from '$lib/nav'

export function getReleaseMenu(data: any, basePath: string): NavMenu {
  const reactComponentTypeMembers = data.members.filter((member: any) => {
    return member.isReactComponentType
  })

  const members = data.members.filter((member: any) => {
    return !member.isReactComponentType
  })

  return {
    type: 'menu',
    collapsed: false,
    items: [
      {
        type: 'menu',
        collapsed: false,
        items: [
          {
            type: 'menuLink',
            hidden: false,
            title: 'Overview',
            href: basePath,
          },
        ],
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'React components',
        items: reactComponentTypeMembers.map((member: any) => getMenuLink(member, basePath)),
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'Classes',
        items: members
          .filter((member: any) => member._type === 'api.class')
          .map((member: any) => getMenuLink(member, basePath)),
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'Functions',
        items: members
          .filter((member: any) => member._type === 'api.function')
          .map((member: any) => getMenuLink(member, basePath)),
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'Types',
        items: members
          .filter((member: any) => member._type === 'api.typeAlias')
          .map((member: any) => getMenuLink(member, basePath)),
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'Interfaces',
        items: members
          .filter((member: any) => member._type === 'api.interface')
          .map((member: any) => getMenuLink(member, basePath)),
      },
      {
        type: 'menu',
        collapsed: false,
        title: 'Variables',
        items: members
          .filter((member: any) => member._type === 'api.variable')
          .map((member: any) => getMenuLink(member, basePath)),
      },
    ],
  }
}

function getMenuLink(member: any, basePath: string): NavMenuLink {
  let badge: {text: string; tone?: BadgeTone} | undefined = undefined

  if (member.releaseTag === 'alpha') {
    badge = {text: 'alpha', tone: 'caution'}
  }

  if (member.releaseTag === 'beta') {
    badge = {text: 'beta', tone: 'caution'}
  }

  if (member.releaseTag === 'internal') {
    badge = {text: 'internal', tone: 'critical'}
  }

  return {
    type: 'menuLink',
    hidden: false,
    href: `${basePath}/${member.slug}`,
    title: member.name,
    ...(badge ? {badge} : {}),
  }
}
