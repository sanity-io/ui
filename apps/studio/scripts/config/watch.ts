import chokidar from 'chokidar'
import {CONFIG_TS_PATH} from './_constants'
import {writeConfig} from './_writeConfig'

chokidar.watch(CONFIG_TS_PATH, {ignoreInitial: true}).on('all', () => {
  delete require.cache[CONFIG_TS_PATH]
  writeConfig()
})
