import {cookies, draftMode} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(request: NextRequest) {
  ;(await draftMode()).disable()

  // delete cookie
  ;(await cookies()).delete('env')

  const url = new URL(request.nextUrl)

  return NextResponse.redirect(new URL('/', url.origin))
}
