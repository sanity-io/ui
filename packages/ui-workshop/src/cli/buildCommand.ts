import {build} from '@sanity/ui-workshop/runtime'

export async function buildCommand(options: {cwd: string}): Promise<void> {
  await build(options)
}
