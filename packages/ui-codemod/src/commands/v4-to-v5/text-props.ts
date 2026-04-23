import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class TextProps extends BaseCommand<typeof TextProps> {
  static override description = 'transform Text component props'

  public async run(): Promise<void> {
    const {flags} = await this.parse(TextProps)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'v4-to-v5', 'text-props')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
