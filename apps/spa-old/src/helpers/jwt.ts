// This is for the client browser

/**
 * Decode a Base64URL string to a UTF-8 string in the browser.
 * Handles padding and URL-safe characters.
 */
function base64UrlDecode(str: string): string {
  // Replace URL-safe characters
  let output = str.replace(/-/g, '+').replace(/_/g, '/')
  // Pad with '=' characters if needed
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
    default:
      // Invalid base64 string
      throw new Error('Invalid base64 string')
  }

  // atob gives a binary string (each char code is a byte). Convert to percent-encoding, then decode as UTF-8.
  // This preserves Unicode characters correctly.
  const binary = atob(output)
  const percentEncoded = Array.prototype.map
    .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('')
  return decodeURIComponent(percentEncoded)
}

/**
 * Decode a JWT payload in the browser.
 * Returns the parsed payload object, or null if the token is invalid.
 *
 * Example:
 *   const payload = decodeJWT(token)
 *   if (payload) console.log(payload.sub, payload.exp)
 */
export function decodeJWT<T = Record<string, any>>(token: unknown): T | null {
  if (!token || typeof token !== 'string') return null

  const parts = token.split('.')
  if (parts.length < 2) return null

  const payloadB64 = parts[1]
  try {
    const json = base64UrlDecode(payloadB64)
    return JSON.parse(json) as T
  } catch {
    // Invalid token / decoding failed
    return null
  }
}

/**
 * Convenience helper to check whether a token is expired.
 * Returns true if expired, false if still valid, or null if token is invalid or has no exp claim.
 */
export function isTokenExpired(token: unknown): boolean | null {
  if (!token || typeof token !== 'string') return null
  const payload = decodeJWT<{ exp?: number }>(token)
  if (!payload) return null
  if (typeof payload.exp !== 'number') return null
  // exp is in seconds since epoch
  const now = Math.floor(Date.now() / 1000)
  return payload.exp <= now
}
