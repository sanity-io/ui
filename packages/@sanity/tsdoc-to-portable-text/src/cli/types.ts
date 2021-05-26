export type CmdFn = (ctx: {
  args: Array<string | number>
  cwd: string
  flags: Record<string, unknown>
}) => Promise<void>
