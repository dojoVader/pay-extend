import { defineStore } from 'pinia';
import { ref } from 'vue';
import { decodeJWT } from '@/helpers/jwt';
import { POLARKIT_BASE_URL } from '@/constant';

type User = {
  name: string;
  token?: string;
};

export const useAuth = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const setUser = (u: User | null) => {
      user.value = u ? { ...u } : null;
      error.value = null;
    };

    const fetchUser = async (username: string, password: string) => {
      loading.value = true;
      error.value = null;
      try {
        const res = await fetch(`${POLARKIT_BASE_URL}auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          const body = await res.json();
          throw new Error(
            body?.message || `Authentication failed (${res.status})`,
          );
        }
        const data = await res.json();
        const found: User = { name: data.name ?? username, token: data.token };
        setUser(found);
        // Redirect to the dashboard or home page after successful login
        window.location.href = '/dashboard';
        return found;
      } catch (err: any) {
        error.value = err?.message ?? String(err);
        setUser(null);
        throw err;
      } finally {
        loading.value = false;
      }
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('auth');
    };

    const getDecodedToken = () => {
      if (!user.value?.token) return null;
      return decodeJWT(user.value.token);
    };

    const getUser = () => {
      const data = localStorage.getItem('auth');
      if (data) return JSON.parse(data);
      return null;
    };

    return {
      user,
      loading,
      error,
      setUser,
      fetchUser,
      logout,
      getDecodedToken,
      getUser,
    };
  },
  { persist: true },
);
