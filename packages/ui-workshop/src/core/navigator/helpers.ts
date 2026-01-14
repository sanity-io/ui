import {set} from 'segmented-property'
import {WorkshopScope} from '../config'
import {MenuCollection, MenuList, MenuScope, MenuStory} from './types'

/** @internal */
export function parseMenuNode(
  collections: MenuCollection[],
  node: Record<string, unknown>,
  name?: string,
): Array<MenuList | MenuScope | MenuStory> {
  if (node.__scope__) {
    const scope = node.__scope__ as WorkshopScope

    if (scope.name === '@@root@@') {
      return scope.stories.map((s) => ({type: 'story', ...s}))
    }

    return [
      {
        type: 'scope',
        name: scope.name || '@@root@@',
        title: scope.title || '(root)',
        scope,
      },
    ]
  }

  const coll = collections.find((c) => c.name === name)

  const entries = Object.entries(node).filter(([key]) => key !== '__scope__')

  const items = entries.flatMap(([key, child]) =>
    parseMenuNode(coll?.children || [], child as Record<string, unknown>, key),
  )

  return [
    {
      type: 'list',
      name,
      title: coll?.title || name,
      items,
    },
  ]
}

/** @internal */
export function buildMenu(
  collections: MenuCollection[],
  scopes: WorkshopScope[],
): MenuList | MenuScope {
  const scopeMap: {[key: string]: WorkshopScope} = {}

  // Merge scopes
  for (const scope of scopes) {
    const scopeName = scope.name || '@@root@@'

    const prevScope: WorkshopScope = scopeMap[scopeName] || {
      name: scopeName,
      title: scope.title,
      stories: [],
    }

    const mergedScope: WorkshopScope = {
      ...prevScope,
      name: scopeName,
      stories: prevScope.stories.concat(scope.stories),
    }

    scopeMap[scopeName] = mergedScope
  }

  let tree = {}

  for (const scope of Object.values(scopeMap)) {
    tree = set(tree, scope.name || '@@root@@', {__scope__: scope})
  }

  const rootNode: MenuList = {
    type: 'list',
    name: '@@root@@',
    items: [],
  }

  for (const [key, entry] of Object.entries(tree)) {
    rootNode.items.push(...parseMenuNode(collections, entry as Record<string, unknown>, key))
  }

  return rootNode
}
