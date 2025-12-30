import { defineStore } from 'pinia'
import { ref } from 'vue'
import { decodeJWT } from "@/helpers/jwt.ts";

type User = {
  name: string
  token?: string
}

export const useAuth = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    /** Set user directly */
    const setUser = (u: User | null) => {
      user.value = u ? { ...u } : null
      error.value = null
      // Sync token to localStorage for fetchWithAuth usage
    }

    /**
     * Fetch user by username/password.
     * This will POST to `/api/auth/login` and expects { name, token } on success.
     * It returns the user object on success or throws an Error.
     */
    const fetchUser = async (username: string, password: string) => {
      loading.value = true
      error.value = null

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })

        if (!res.ok) {
          const body = await res.text()
          throw new Error(body || `Authentication failed (${res.status})`)
        }

        const data = await res.json()
        // Expect at least { name, token }
        const found: User = { name: data.name ?? username, token: data.token }
        setUser(found)
        return found
      } catch (err: any) {
        error.value = err?.message ?? String(err)
        setUser(null)
        throw err
      } finally {
        loading.value = false
      }
    }

    const logout = () => {
      setUser(null)
    }

    const getDecodedToken = () => {
      if (!user.value?.token) return null;
      return decodeJWT(user.value.token);
    }

    const getUser = () => {
      const data = localStorage.getItem('auth');
      if (data) {
        return JSON.parse(data);
      }
      return null;
    }

    return { user, loading, error, setUser, fetchUser, logout, getDecodedToken , getUser}
  },
  { persist: true }
)

