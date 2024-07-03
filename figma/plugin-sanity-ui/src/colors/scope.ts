import {findNearestCard} from './findCard'

const SANITY_UI_LIBARY_NAME = 'Sanity UI'

export async function scopeColors(): Promise<void> {
  const selection = figma.currentPage.selection

  for (const node of selection) {
    const result = await findNearestCard(node)

    if (result) {
      const props = result.instance.componentProperties
      const tone = props.tone?.value

      if (tone && typeof tone === 'string') {
        await applyCardColors(node, tone)
      }
    }
  }
}

async function applyCardColors(node: SceneNode, tone: string) {
  const libraryCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()
  const uiLibraryCollections = libraryCollections.filter(
    (coll) => coll.libraryName === SANITY_UI_LIBARY_NAME,
  )
  const uiColorCollection = uiLibraryCollections.find((coll) => coll.name === 'Color')

  if (!uiColorCollection) {
    // eslint-disable-next-line no-console
    console.error('Could not find the color collection in the Sanity UI library')

    return
  }

  // eslint-disable-next-line no-console
  console.log('todo: apply color scope', {uiColorCollection, node, tone})
}
