export function useCommands() {
  return [
    {
      name: 'log-active-element',
      shortcut: ['mod', 'shift', 'f'],
      title: 'Log active element',
      handle() {
        console.log(document.activeElement)
      },
    },
    {
      name: 'sign-out',
      shortcut: ['mod', 'shift', 'l'],
      title: 'Sign out',
      handle() {
        console.log('@todo: sign out')
      },
    },
  ]
}
