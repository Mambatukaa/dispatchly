const TOKEN_KEY = 'auth-token'

export function saveToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
    // Also save to cookie so middleware can access it
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=Strict`
  }
}

export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    // Remove cookie too
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict`
  }
}

export function isAuthenticated() {
  return !!getToken()
}
