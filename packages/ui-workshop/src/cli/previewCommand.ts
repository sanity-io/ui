import {preview} from '@sanity/ui-workshop/runtime'

export async function previewCommand(options: {cwd: string}): Promise<void> {
  await preview(options)
}
