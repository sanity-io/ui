import createSanityClient, {SanityDocument} from '@sanity/client'
import chalk from 'chalk'
import {config} from '../config'

export async function extractPackagesFromSanity(options: {
  quiet: boolean
}): Promise<Record<string, SanityDocument | undefined>> {
  const {quiet} = options

  if (!quiet) {
    console.log(`${chalk.blue('info')} Extract packages from Sanity ...`)
  }

  let data: Record<string, SanityDocument | undefined> = {}

  if (config.sanity.token) {
    const sanityClient = createSanityClient({
      ...config.sanity,
      apiVersion: '2021-06-01',
      useCdn: false,
    })

    data = await sanityClient.fetch(`{
      'color': *[_type == 'api.package' && name == 'color'][0],
      'icons': *[_type == 'api.package' && name == 'icons'][0],
      'logos': *[_type == 'api.package' && name == 'logos'][0],
      'ui': *[_type == 'api.package' && name == 'ui'][0]
    }`)
  }

  return {
    color: _extractPackage({data: data.color, name: 'color'}),
    icons: _extractPackage({data: data.icons, name: 'icons'}),
    logos: _extractPackage({data: data.logos, name: 'logos'}),
    ui: _extractPackage({data: data.ui, name: 'ui'}),
  }
}

function _extractPackage(options: {
  data?: SanityDocument
  name: string
}): SanityDocument | undefined {
  const {data, name} = options

  if (!data) return undefined

  const result = {...data} as Record<string, unknown>

  delete result._createdAt
  delete result._updatedAt

  console.log(`${chalk.green('success')} [@sanity/${name}] Extracted packages from Sanity`)

  return result as SanityDocument
}
