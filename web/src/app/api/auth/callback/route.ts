import api from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return {
      status: 400,
      body: 'Missing code',
    }
  }

  const redirectTo = request.cookies.get('redirectTo')?.value || '/'

  const res = await api.post('/register', { code })
  const { token } = res.data

  const timeToExpire = 60 * 60 * 24 * 30 // 30 days

  const redirect = new URL(redirectTo, request.url)

  return NextResponse.redirect(redirect, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${timeToExpire}; SameSite=Lax`,
    },
  })
}
