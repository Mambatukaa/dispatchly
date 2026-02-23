'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { getToken } from '@/utils/auth'
import { GET_CURRENT_USER } from '@/app/(auth)/graphql/queries'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const apolloClient = useApolloClient()

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const token = getToken()
        if (!token) {
          setIsLoading(false)
          return
        }

        // Query the server to get current user data
        const { data } = await apolloClient.query<{ me: User }>({
          query: GET_CURRENT_USER,
        })

        if (data?.me) {
          setUser(data.me)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        // If query fails, user stays null
      } finally {
        setIsLoading(false)
      }
    }

    initializeUser()
  }, [apolloClient])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}
