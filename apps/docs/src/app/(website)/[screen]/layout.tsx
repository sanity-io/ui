


export default async function Layout({children, params}: LayoutProps<'/[screen]'>) {
  const {screen} = await params
  return <div>Layout <code>{JSON.stringify({screen})}</code> {children}</div>
}
