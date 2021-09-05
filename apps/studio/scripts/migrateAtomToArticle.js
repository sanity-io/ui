import client from 'part:@sanity/base/client'

const fetchDocuments = () => client.fetch(`*[_type == 'atom']`)

async function migrate() {
  const docs = await fetchDocuments()

  return Promise.all(
    docs.map(({_id: prevId, ...doc}) => {
      // eslint-disable-next-line no-console
      console.log('previous id', prevId)

      return client.create({...doc, _type: 'article'})
    })
  )
}

migrate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
