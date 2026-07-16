export default async function Page({params}: PageProps<'/[screen]/[...article]'>) {
  const {screen, article} = await params
  return <div>Page <code>{JSON.stringify({screen, article})}</code></div>
}
