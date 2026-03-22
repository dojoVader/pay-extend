import router from '@/router'
import { useAuth } from '@/stores/auth'

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const lsToken = localStorage.getItem('auth_token')
  const auth = useAuth()
  const token = lsToken || auth?.user?.token || undefined

  const headers = new Headers(init?.headers ?? {})
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (!headers.has('Content-Type') && !(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401) {
    try {
      localStorage.removeItem('auth_token')
      auth?.setUser(null)
    } catch {
      // ignore
    }
    try {
      const redirect = window.location.pathname + window.location.search
      if (router) {
        if (!lsToken) await router.push({ path: '/auth/login', query: { redirect } })
      } else {
        window.location.href = `/auth/login?redirect=${encodeURIComponent(redirect)}`
      }
    } catch {
      // ignore
    }
  }

  return res
}
