import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class TooltipGroup extends BaseCommand<typeof TooltipGroup> {
  static override description = 'Transform TooltipGroup component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(TooltipGroup)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'tooltip-group')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
