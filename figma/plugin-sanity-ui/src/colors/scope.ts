const SANITY_UI_LIBARY_NAME = 'Sanity UI'

export async function scopeColors(): Promise<void> {
  const libraryCollections = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()
  const uiLibraryCollections = libraryCollections.filter(
    (coll) => coll.libraryName === SANITY_UI_LIBARY_NAME,
  )

  // eslint-disable-next-line no-console
  console.log(uiLibraryCollections)

  // eslint-disable-next-line no-console
  console.log('todo: do color scoping on selection')
}
