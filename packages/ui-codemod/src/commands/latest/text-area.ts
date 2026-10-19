import {run} from 'jscodeshift/src/Runner.js'

import {BaseCommand} from '../../baseCommand'
import {getTransformPath} from '../../utils/getTransformPath'

/** @public */
export default class TextArea extends BaseCommand<typeof TextArea> {
  static override description = 'Transform TextArea component'

  public async run(): Promise<void> {
    const {flags} = await this.parse(TextArea)
    const {paths, ...restFlags} = flags
    const transformPath = getTransformPath(this.config.root, 'latest', 'text-area')

    await run(transformPath, paths, {
      babel: true,
      parser: 'tsx',
      ...restFlags,
    })
  }
}
