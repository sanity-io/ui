import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class Switch extends BaseCommand<typeof Switch> {
  static override description = 'Transform Switch component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(Switch)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'switch')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
