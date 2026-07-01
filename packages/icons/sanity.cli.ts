import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ppsg7ml5',
    dataset: 'icons',
  },
  // Deploys the Studio to https://icons.sanity.studio.
  // oxlint-disable-next-line typescript/no-deprecated
  studioHost: 'icons',
  deployment: {
    appId: 'kzr7jgsqcbbjvtum223ykpir',
    autoUpdates: true,
  },
})
