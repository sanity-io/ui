import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class TooltipDelayGroupProvider extends BaseCommand<
  typeof TooltipDelayGroupProvider
> {
  static override description = 'Transform TooltipDelayGroupProvider component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(TooltipDelayGroupProvider)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(
      this.config.root,
      'latest',
      'tooltip-delay-group-provider',
    )

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
