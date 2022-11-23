import {dev} from '@sanity/ui-workshop/runtime'

export async function devCommand(options: {cwd: string}): Promise<void> {
  await dev(options)
}
