import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class Checkbox extends BaseCommand<typeof Checkbox> {
  static override description = 'Transform Checkbox component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(Checkbox)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'checkbox')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
