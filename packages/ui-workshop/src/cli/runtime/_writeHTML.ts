import {writeFile} from 'fs/promises'
import path from 'path'

const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
    />
    <style>
      html {
        -webkit-text-size-adjust: 100%;
        text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
      }
      html,
      body,
      #root {
        height: 100%;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/main.tsx"></script>
  </body>
</html>
`

export async function _writeHTML(options: {outDir: string}): Promise<void> {
  await writeFile(path.resolve(options.outDir, 'index.html'), HTML)
}
