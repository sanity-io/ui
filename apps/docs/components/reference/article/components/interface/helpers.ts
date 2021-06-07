export function getInterfaceMembers(data: any) {
  let mems = data.members

  if (data.extends) {
    for (const ext of data.extends) {
      for (const tok of ext.type) {
        if (tok._type === 'api.reference' && tok.reference?.members) {
          mems = mems.concat(
            tok.reference.members.map((inheritedMem: any) => {
              return {
                ...inheritedMem,
                inheritedFrom: {
                  name: tok.reference.name,
                  slug: tok.reference.slug,
                },
              }
            })
          )
        }
      }
    }
  }

  mems.sort((a: any, b: any) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1

    return 0
  })

  return mems
}
