/* eslint-disable no-console */

import 'dotenv-flow/config'

const FIGMA_BASE_URL = 'https://api.figma.com'
const FIGMA_FILE_ID = 'Io4wkAmU0VhScVu8edUrBD'
const FIGMA_TOKEN = process.env['FIGMA_TOKEN']

if (!FIGMA_TOKEN) {
  console.error('FIGMA_TOKEN environment variable is required')
  process.exit(1)
}

async function figmaDeploy() {
  // const file = await loadFile(FIGMA_FILE_ID)
  const fileVariables = await loadFileVariables(FIGMA_FILE_ID)

  console.log(fileVariables)
}

// GET /v1/files/:file_key
// async function loadFile(fileId: string) {
//   const res = await fetch(`${FIGMA_BASE_URL}/v1/files/${fileId}`, {
//     headers: {
//       'X-Figma-Token': FIGMA_TOKEN,
//       'Content-Type': 'application/json',
//     },
//   })

//   return res.json()
// }

// GET /v1/files/:file_key/variables/local
async function loadFileVariables(fileId: string) {
  const res = await fetch(`${FIGMA_BASE_URL}/v1/files/${fileId}/variables/local`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN!,
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}

figmaDeploy().catch((err) => {
  console.error(err)
  process.exit(1)
})
