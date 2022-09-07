import {ChartUpwardIcon} from '@sanity/icons'
import {studioTheme, Theme, ThemeProvider} from '@sanity/ui'
import {createElement} from 'react'
import {createGlobalStyle, css} from 'styled-components'
import {LocationProvider, StudioProvider, useLocation, useStudioToolPlugins} from '$sanity/base'
import dashboardTool from '$sanity/dashboard/plugin'
import deskTool from '$sanity/desk-tool/plugin'
import {Layout} from '$sanity/layout'
import visionTool from '$sanity/vision/plugin'

const GlobalStyle = createGlobalStyle((props: {theme: Theme}) => {
  const {theme} = props
  const {base} = theme.sanity.color

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${base.bg};
      color: ${base.fg};
      margin: 0;
    }
  `
})

const plugins = [
  deskTool({title: 'Content'}),
  dashboardTool({icon: ChartUpwardIcon, name: 'analytics', title: 'Analytics'}),
  visionTool(),
]

function ActiveTool() {
  const {segments} = useLocation()
  const tools = useStudioToolPlugins()
  const activeToolName = segments[0] || tools[0]?.name

  const activeTool = tools.find((t: any) => t.name === activeToolName)

  if (activeTool) {
    return createElement(activeTool.component)
  }

  return <div>Unknown tool: {activeToolName}</div>
}

export function Root() {
  const themeMode = 'light'

  const commands = [
    {
      name: 'log-active-element',
      shortcut: ['mod', 'shift', 'f'],
      title: 'Log active element',
      handle() {
        // eslint-disable-next-line no-console
        console.log(document.activeElement)
      },
    },
    {
      name: 'sign-out',
      shortcut: ['mod', 'shift', 'l'],
      title: 'Sign out',
      handle() {
        // eslint-disable-next-line no-console
        console.log('@todo: sign out')
      },
    },
  ]

  return (
    <ThemeProvider theme={studioTheme} scheme={themeMode} tone="transparent">
      <GlobalStyle />
      <StudioProvider commands={commands} dataset="production" plugins={plugins} projectId="foo">
        <LocationProvider>
          <Layout projectName="Sanity.io">
            <ActiveTool />
          </Layout>
        </LocationProvider>
      </StudioProvider>
    </ThemeProvider>
  )
}
