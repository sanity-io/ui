import {Command, Flags, Interfaces} from '@oclif/core'

export type Flags<T extends typeof Command> = Interfaces.InferredFlags<
  (typeof BaseCommand)['baseFlags'] & T['flags']
>
export type Args<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static override baseFlags = {
    paths: Flags.string({
      description: 'Paths for jscodeshift',
      multiple: true,
      required: true,
      helpValue: '<paths>',
    }),
    fromPackage: Flags.string({
      description: 'Original package name to transform',
    }),
    toPackage: Flags.string({
      description: 'New package name',
    }),
    dry: Flags.boolean({
      description: 'Dry run without changing files',
      default: false,
      allowNo: true,
    }),
    print: Flags.boolean({
      description: 'Print transformed files',
      default: false,
      allowNo: true,
    }),
    verbose: Flags.integer({
      description: 'Log level for jscodeshift errors',
      min: 0,
      max: 2,
      default: 0,
    }),
  }

  protected flags!: Flags<T>
  protected args!: Args<T>

  static override examples = [
    '<%= config.bin %> <%= command.id %> --paths <paths>',
    '<%= config.bin %> <%= command.id %> --paths <paths> --dry',
    '<%= config.bin %> <%= command.id %> --paths <paths> --print',
  ]

  public override async init(): Promise<void> {
    await super.init()

    const {args, flags} = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })

    this.flags = flags as Flags<T>
    this.args = args as Args<T>
  }

  protected override async catch(err: Error & {exitCode?: number}): Promise<unknown> {
    return super.catch(err)
  }

  protected override async finally(_: Error | undefined): Promise<unknown> {
    return super.finally(_)
  }
}
