import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class FlexProps extends BaseCommand<typeof FlexProps> {
  static override description = 'transform Flex component props'

  public async run(): Promise<void> {
    const {flags} = await this.parse(FlexProps)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'flex-props')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
