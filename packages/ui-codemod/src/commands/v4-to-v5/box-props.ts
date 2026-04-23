import {run} from 'jscodeshift/src/Runner'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class BoxProps extends BaseCommand<typeof BoxProps> {
  static override description = 'transform Box component props'

  public async run(): Promise<void> {
    const {flags} = await this.parse(BoxProps)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'v4-to-v5', 'box-props')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
