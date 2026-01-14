import chalk from 'chalk'
import {format} from 'date-fns'

export const logger = {
  log: (message: string) => {
    const now = new Date()

    // eslint-disable-next-line no-console
    console.log(
      `${chalk.gray(format(now, 'h:mm:ss a'))} ${chalk.blue.bold('[workshop]')} ${message}`,
    )
  },
}
