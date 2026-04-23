import {run} from 'jscodeshift/src/Runner'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class GridProps extends BaseCommand<typeof GridProps> {
  static override description = 'transform Grid component props'

  public async run(): Promise<void> {
    const {flags} = await this.parse(GridProps)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'v4-to-v5', 'grid-props')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
