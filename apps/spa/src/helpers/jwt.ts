function base64UrlDecode(str: string): string {
  let output = str.replace(/-/g, '+').replace(/_/g, '/')
  switch (output.length % 4) {
    case 0: break
    case 2: output += '=='; break
    case 3: output += '='; break
    default: throw new Error('Invalid base64 string')
  }
  const binary = atob(output)
  const percentEncoded = Array.prototype.map
    .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('')
  return decodeURIComponent(percentEncoded)
}

export function decodeJWT<T = Record<string, any>>(token: unknown): T | null {
  if (!token || typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length < 2) return null
  try {
    return JSON.parse(base64UrlDecode(parts[1])) as T
  } catch {
    return null
  }
}
