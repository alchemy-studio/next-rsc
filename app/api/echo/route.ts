import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const message = searchParams.get('message')
  return Response.json({ echo: message ?? 'No message provided' })
}
