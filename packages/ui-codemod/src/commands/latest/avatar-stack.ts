import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class AvatarStack extends BaseCommand<typeof AvatarStack> {
  static override description = 'Transform AvatarStack component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(AvatarStack)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'avatar-stack')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
