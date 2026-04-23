import {Args, Command, Flags} from '@oclif/core'

/** @public */
export default class BoxProps extends Command {
  static override args = {
    file: Args.string({description: 'file to read'}),
  }

  static override description = 'describe the command here'

  static override examples = ['<%= config.bin %> <%= command.id %>']

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({char: 'n', description: 'name to print'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(BoxProps)

    const name = flags.name ?? 'world'

    this.log(
      `hello ${name} from /Users/lauren.ashpole/Projects/ui-poc/packages/ui-codemod/src/commands/sanity-ui/box-props.ts`,
    )

    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}

// src/commands/my-command.ts

// export default class MyCommand extends BaseCommand<typeof MyCommand> {
//   static summary = 'child class that extends BaseCommand'

//   static examples = [
//     '<%= config.bin %> <%= command.id %>',
//     '<%= config.bin %> <%= command.id %> --json',
//     '<%= config.bin %> <%= command.id %> --log-level debug',
//   ]

//   static flags = {
//     name: Flags.string({
//       char: 'n',
//       summary: 'Name to print.',
//       required: true,
//     }),
//   }

//   public async run(): Promise<Flags<typeof MyCommand>> {
//     for (const [flag, value] of Object.entries(this.flags)) {
//       this.log(`${flag}: ${value}`)
//     }

//     return this.flags
//   }
// }
