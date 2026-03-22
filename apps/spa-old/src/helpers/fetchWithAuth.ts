import router from '@/router'
import { useAuth } from '@/stores/auth'

/**
 * A lightweight fetch wrapper that attaches Authorization header (if token found)
 * and handles 401 responses by clearing auth state and redirecting to login.
 *
 * Usage:
 *   import { fetchWithAuth } from '@/helpers/fetchWithAuth'
 *   const res = await fetchWithAuth('/api/foo', { method: 'GET' })
 */
export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  // try to obtain token from localStorage first (explicit requirement), fallback to store
  const lsToken = localStorage.getItem('auth_token')
  const auth = useAuth()
  const storeToken = auth?.user?.token
  const token = lsToken || storeToken || undefined

  const headers = new Headers(init?.headers ?? {})
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  if (!headers.has('Content-Type') && !(init && init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(input, { ...init, headers })

  if (res.status === 401) {
    // clear local storage and store
    try {
      localStorage.removeItem('auth_token')
      auth?.setUser(null)
    } catch (e) {
      // ignore
    }

    // redirect to login preserving the attempted path
    // If router is not ready, fall back to location assign
    try {
      const redirect = typeof window !== 'undefined' ? window.location.pathname + window.location.search : undefined

      if (router) {
          if(!lsToken){
            await router.push({ path: '/auth/login', query: { redirect } })
          }

      } else if (redirect) {
        window.location.href = `/auth/login?redirect=${encodeURIComponent(redirect)}`
      }
    } catch (e) {
      // fallback for the
      try {
        const redirect = typeof window !== 'undefined' ? window.location.pathname + window.location.search : ''
        window.location.href = `/auth/login?redirect=${encodeURIComponent(redirect)}`
      } catch (e) {
        /* nothing */
      }
    }
  }

  return res
}

