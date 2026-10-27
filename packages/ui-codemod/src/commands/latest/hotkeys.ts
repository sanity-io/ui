import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class Hotkeys extends BaseCommand<typeof Hotkeys> {
  static override description = 'Transform Hotkeys component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(Hotkeys)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'hotkeys')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
