import {set} from 'segmented-property'
import {WorkshopScope} from '../types'
import {MenuCollection, MenuList, MenuScope} from './types'

/** @internal */
export function buildMenuItems(
  collections: MenuCollection[],
  node: Record<string, unknown>,
  name?: string
): MenuList | MenuScope {
  if (Array.isArray(node.stories)) {
    return {
      type: 'scope',
      name: node.name as string,
      title: node.title as string,
      scope: node as any,
    }
  }

  const coll = collections.find((c) => c.name === name)

  return {
    type: 'list',
    name,
    title: coll ? coll.title : name,
    items: (Object.entries(node) as any).map(([name, child]: any) =>
      buildMenuItems(coll?.children || [], child, name)
    ),
  }
}

/** @internal */
export function buildMenu(
  collections: MenuCollection[],
  scopes: WorkshopScope[]
): MenuList | MenuScope {
  const scopeMap: {[key: string]: WorkshopScope} = {}

  // Merge scopes
  for (const scope of scopes) {
    if (scopeMap[scope.name]) {
      scopeMap[scope.name] = {
        ...scopeMap[scope.name],
        title: scope.title,
        stories: scopeMap[scope.name].stories?.concat(scope.stories || []) || [],
      }
    } else {
      scopeMap[scope.name] = scope
    }
  }

  let tree = {}

  for (const [name, scope] of Object.entries(scopeMap)) {
    tree = set(tree, name, scope)
  }

  return buildMenuItems([{children: collections}], tree)
}
