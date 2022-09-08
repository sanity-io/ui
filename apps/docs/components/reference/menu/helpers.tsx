import {BadgeTone} from '@sanity/ui'
import {NavMenu, NavMenuItem, NavMenuLink} from '../../../lib/nav'

export function getReleaseMenu(data: any, basePath: string): NavMenu {
  const reactComponentTypeMembers: any[] = data.members.filter((member: any) => {
    return member.isReactComponentType
  })

  const members: any[] = data.members.filter((member: any) => {
    return !member.isReactComponentType
  })

  const reactCommponentItems = reactComponentTypeMembers.map((member: any) =>
    getMenuLink(member, basePath)
  )

  const classItems = members
    .filter((member: any) => member._type === 'api.class')
    .map((member: any) => getMenuLink(member, basePath))

  const functionItems = members
    .filter((member: any) => member._type === 'api.function')
    .map((member: any) => getMenuLink(member, basePath))

  const typeItems = members
    .filter((member: any) => member._type === 'api.typeAlias')
    .map((member: any) => getMenuLink(member, basePath))

  const interfaceItems = members
    .filter((member: any) => member._type === 'api.interface')
    .map((member: any) => getMenuLink(member, basePath))

  const variableItems = members
    .filter((member: any) => member._type === 'api.variable')
    .map((member: any) => getMenuLink(member, basePath))

  const items: NavMenuItem[] = [
    {
      type: 'menuLink',
      hidden: false,
      title: 'Overview',
      href: basePath,
    },
  ]

  if (reactCommponentItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'React components',
      items: reactCommponentItems,
    })
  }

  if (classItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'Classes',
      items: classItems,
    })
  }

  if (functionItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'Functions',
      items: functionItems,
    })
  }

  if (typeItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'Types',
      items: typeItems,
    })
  }

  if (interfaceItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'Interfaces',
      items: interfaceItems,
    })
  }

  if (variableItems.length) {
    items.push({
      type: 'menu',
      collapsed: false,
      title: 'Variables',
      items: variableItems,
    })
  }

  return {
    type: 'menu',
    collapsed: false,
    items,
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
