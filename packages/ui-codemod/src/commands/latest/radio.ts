import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class Radio extends BaseCommand<typeof Radio> {
  static override description = 'Transform Radio component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(Radio)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'radio')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
