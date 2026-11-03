import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class Tooltip extends BaseCommand<typeof Tooltip> {
  static override description = 'Transform Tooltip component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(Tooltip)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'tooltip')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
