import path from 'node:path'

import {run} from 'jscodeshift/src/Runner'

import {BaseCommand} from '../../baseCommand.js'

/** @public */
export default class BoxProps extends BaseCommand<typeof BoxProps> {
  static override description = 'transform Box component props'

  // static override examples = [
  //   '<%= config.bin %> <%= command.id %> --paths <paths>',
  //   '<%= config.bin %> <%= command.id %> --paths <paths> --dry',
  //   '<%= config.bin %> <%= command.id %> --paths <paths> --print',
  // ]

  public async run(): Promise<void> {
    const {flags} = await this.parse(BoxProps)
    const transformPath = path.resolve('box-props.ts')

    await run(transformPath, flags.paths, {})
  }
}
