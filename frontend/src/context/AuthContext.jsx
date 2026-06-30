import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('runbud_user')
    return saved ? JSON.parse(saved) : null
  })

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('runbud_user', JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('runbud_user')
  }, [])

  const refreshUser = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('runbud_user', JSON.stringify(userData))
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
