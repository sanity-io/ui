import {run} from 'jscodeshift/src/Runner'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class HeadingProps extends BaseCommand<typeof HeadingProps> {
  static override description = 'transform Heading component props'

  public async run(): Promise<void> {
    const {flags} = await this.parse(HeadingProps)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'v4-to-v5', 'heading-props')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
