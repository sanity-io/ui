// import {createClient} from 'next-sanity'
import {createClient} from '@sanity/client'

export const client = createClient({
  apiVersion: process.env.SANITY_API_VERSION,
  dataset: process.env.SANITY_DATASET,
  projectId: process.env.SANITY_PROJECT_ID,
  token: process.env.SANITY_VIEWER_TOKEN,
  useCdn: true,
})
