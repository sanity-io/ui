import crypto from 'crypto'
import os from 'os'

export function getMachineInfo() {
  const cpus = os.cpus().map((cpu, i) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {times, ...attrs} = cpu

    return {_key: `cpu${i}`, ...attrs}
  })

  const key = crypto
    .createHash('md5')
    .update(
      cpus
        .map((cpu) => `${cpu.model}-${cpu.speed}`)
        .concat([String(os.totalmem()), os.type(), os.platform(), os.arch()])
        .join('')
    )
    .digest('hex')

  return {
    key,
    cpus,
    totalMemoryBytes: os.totalmem(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
  }
}
