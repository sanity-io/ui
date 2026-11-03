import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class AvatarCounter extends BaseCommand<typeof AvatarCounter> {
  static override description = 'Transform AvatarCounter component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(AvatarCounter)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'avatar-counter')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
